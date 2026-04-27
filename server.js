import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { benchmarkSuites, getProvider, publicProviders } from "./src/providers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.PORT || 3000);
const maxBodyBytes = 1024 * 1024;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, { ok: true, name: "LLM API Test Studio" });
    }

    if (req.method === "GET" && url.pathname === "/api/providers") {
      return sendJson(res, 200, {
        providers: publicProviders(),
        benchmarks: benchmarkSuites
      });
    }

    if (req.method === "GET" && url.pathname === "/api/benchmarks") {
      return sendJson(res, 200, { benchmarks: benchmarkSuites });
    }

    if (req.method === "POST" && url.pathname === "/api/benchmarks/run") {
      return sendJson(res, 202, {
        status: "planned",
        message: "Benchmark runner interface is reserved; execution is not implemented yet.",
        benchmarks: benchmarkSuites
      });
    }

    if (req.method === "POST" && url.pathname === "/api/chat") {
      return handleChat(req, res);
    }

    if (req.method === "GET") {
      return serveStatic(url.pathname, res);
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      sendJson(res, 500, { error: "Internal server error" });
    } else {
      res.end();
    }
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`LLM API Test Studio running at http://0.0.0.0:${port}`);
});

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

async function serveStatic(requestPath, res) {
  const safePath = path.normalize(decodeURIComponent(requestPath)).replace(/^(\.\.[/\\])+/, "");
  const relativePath = safePath === "/" ? "index.html" : safePath.replace(/^[/\\]/, "");
  const filePath = path.join(publicDir, relativePath);

  if (!filePath.startsWith(publicDir) || !existsSync(filePath)) {
    return sendStaticFile(path.join(publicDir, "index.html"), res);
  }

  return sendStaticFile(filePath, res);
}

function sendStaticFile(filePath, res) {
  const ext = path.extname(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(res);
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > maxBodyBytes) {
      const error = new Error("Request body is too large");
      error.statusCode = 413;
      throw error;
    }
  }

  try {
    return JSON.parse(body || "{}");
  } catch {
    const error = new Error("Invalid JSON request body");
    error.statusCode = 400;
    throw error;
  }
}

async function handleChat(req, res) {
  let payload;
  try {
    payload = await readJson(req);
  } catch (error) {
    return sendJson(res, error.statusCode || 400, { error: error.message });
  }

  const provider = getProvider(payload.providerId);
  if (!provider) {
    return sendJson(res, 400, { error: "Unknown provider" });
  }

  const apiKey = String(payload.apiKey || "").trim();
  const model = String(payload.model || provider.defaultModel || "").trim();
  if (!apiKey) {
    return sendJson(res, 400, { error: "API key is required" });
  }
  if (!model) {
    return sendJson(res, 400, { error: "Model is required" });
  }

  const messages = normalizeMessages(payload.messages, payload.systemPrompt);
  if (!messages.some((message) => message.role === "user")) {
    return sendJson(res, 400, { error: "At least one user message is required" });
  }

  const abortController = new AbortController();
  req.on("close", () => abortController.abort());

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no"
  });

  writeSse(res, "meta", {
    provider: provider.id,
    providerName: provider.name,
    model,
    startedAt: new Date().toISOString()
  });

  const startedAt = Date.now();
  try {
    const upstreamRequest = buildUpstreamRequest(provider, {
      ...payload,
      apiKey,
      model,
      messages
    });

    const upstream = await fetch(upstreamRequest.url, {
      method: "POST",
      headers: upstreamRequest.headers,
      body: JSON.stringify(upstreamRequest.body),
      signal: abortController.signal
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      writeSse(res, "error", {
        message: `Upstream request failed with ${upstream.status}`,
        status: upstream.status,
        details: safeErrorDetails(errorText)
      });
      return res.end();
    }

    if (!upstream.body) {
      writeSse(res, "error", { message: "Upstream response has no body" });
      return res.end();
    }

    if (provider.adapter === "anthropic") {
      await relayAnthropicStream(upstream.body, res);
    } else if (provider.adapter === "gemini") {
      await relayGeminiStream(upstream.body, res);
    } else {
      await relayOpenAiCompatibleStream(upstream.body, res);
    }

    writeSse(res, "done", {
      totalMs: Date.now() - startedAt,
      finishedAt: new Date().toISOString()
    });
    res.end();
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
      writeSse(res, "error", { message: error.message || "Chat request failed" });
    }
    res.end();
  }
}

function normalizeMessages(messages, systemPrompt) {
  const normalized = [];
  const system = String(systemPrompt || "").trim();

  if (system) {
    normalized.push({ role: "system", content: system });
  }

  for (const message of Array.isArray(messages) ? messages : []) {
    const role = String(message.role || "").toLowerCase();
    const content = typeof message.content === "string" ? message.content.trim() : "";
    if (!content || !["system", "user", "assistant"].includes(role)) {
      continue;
    }
    normalized.push({ role, content });
  }

  return normalized.slice(-40);
}

function buildUpstreamRequest(provider, payload) {
  if (provider.adapter === "anthropic") {
    return buildAnthropicRequest(provider, payload);
  }

  if (provider.adapter === "gemini") {
    return buildGeminiRequest(provider, payload);
  }

  return buildOpenAiCompatibleRequest(provider, payload);
}

function buildOpenAiCompatibleRequest(provider, payload) {
  const parameters = normalizeParameters(payload.parameters);
  const baseUrl = normalizeBaseUrl(payload.baseUrl || provider.baseUrl);
  const body = {
    model: payload.model,
    messages: payload.messages,
    stream: true,
    stream_options: { include_usage: true }
  };

  applyCommonParameters(body, parameters);

  if (parameters.thinkingEnabled) {
    if (provider.thinkingMode === "thinking-object") {
      body.thinking = {
        type: "enabled",
        reasoning_effort: parameters.reasoningEffort
      };
    }
    if (provider.thinkingMode === "enable-thinking") {
      body.enable_thinking = true;
      body.thinking_budget = parameters.thinkingBudget;
    }
  }

  return {
    url: `${baseUrl}/chat/completions`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.apiKey}`,
      ...provider.extraHeaders
    },
    body
  };
}

function buildAnthropicRequest(provider, payload) {
  const parameters = normalizeParameters(payload.parameters);
  const baseUrl = normalizeBaseUrl(payload.baseUrl || provider.baseUrl);
  const systemMessages = payload.messages
    .filter((message) => message.role === "system")
    .map((message) => message.content);
  const messages = payload.messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: message.content
    }));
  const body = {
    model: payload.model,
    max_tokens: parameters.maxTokens,
    messages,
    stream: true
  };

  if (systemMessages.length) {
    body.system = systemMessages.join("\n\n");
  }

  if (parameters.thinkingEnabled) {
    const budgetTokens = Math.min(parameters.thinkingBudget, Math.max(128, parameters.maxTokens - 1));
    body.max_tokens = Math.max(parameters.maxTokens, budgetTokens + 1);
    body.thinking = {
      type: "enabled",
      budget_tokens: budgetTokens
    };
  } else {
    body.temperature = parameters.temperature;
    body.top_p = parameters.topP;
  }

  return {
    url: `${baseUrl}/messages`,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": payload.apiKey,
      "anthropic-version": "2023-06-01"
    },
    body
  };
}

function buildGeminiRequest(provider, payload) {
  const parameters = normalizeParameters(payload.parameters);
  const baseUrl = normalizeBaseUrl(payload.baseUrl || provider.baseUrl);
  const systemPrompt = payload.messages
    .filter((message) => message.role === "system")
    .map((message) => message.content)
    .join("\n\n");
  const contents = payload.messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }]
    }));
  const body = {
    contents,
    generationConfig: {
      temperature: parameters.temperature,
      topP: parameters.topP,
      maxOutputTokens: parameters.maxTokens
    }
  };

  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  if (parameters.thinkingEnabled) {
    body.generationConfig.thinkingConfig = {
      includeThoughts: true,
      thinkingBudget: parameters.thinkingBudget
    };
  }

  const model = encodeURIComponent(payload.model);
  const key = encodeURIComponent(payload.apiKey);
  return {
    url: `${baseUrl}/models/${model}:streamGenerateContent?alt=sse&key=${key}`,
    headers: {
      "Content-Type": "application/json"
    },
    body
  };
}

function normalizeParameters(raw = {}) {
  return {
    temperature: clampNumber(raw.temperature, 0, 2, 0.7),
    topP: clampNumber(raw.topP, 0, 1, 0.9),
    maxTokens: Math.round(clampNumber(raw.maxTokens, 128, 32768, 2048)),
    thinkingEnabled: Boolean(raw.thinkingEnabled),
    thinkingBudget: Math.round(clampNumber(raw.thinkingBudget, 128, 32768, 2048)),
    reasoningEffort: ["low", "medium", "high", "max"].includes(raw.reasoningEffort) ? raw.reasoningEffort : "high"
  };
}

function applyCommonParameters(body, parameters) {
  body.temperature = parameters.temperature;
  body.top_p = parameters.topP;
  body.max_tokens = parameters.maxTokens;
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function normalizeBaseUrl(baseUrl) {
  const value = String(baseUrl || "").trim();
  if (!value) {
    throw new Error("Base URL is required");
  }
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("Base URL must start with http or https");
  }
  return url.toString().replace(/\/+$/, "");
}

async function relayOpenAiCompatibleStream(body, res) {
  await readSse(body, (event) => {
    const data = parseJson(event.data);
    if (!data) {
      return;
    }
    if (data.error) {
      writeSse(res, "error", { message: data.error.message || "Upstream error", details: data.error });
      return;
    }

    const choice = data.choices?.[0];
    const delta = choice?.delta || {};
    const message = choice?.message || {};
    const content = delta.content ?? message.content;
    const reasoning = delta.reasoning_content ?? delta.reasoning ?? message.reasoning_content;

    if (typeof reasoning === "string" && reasoning) {
      writeSse(res, "reasoning", { text: reasoning });
    }
    if (typeof content === "string" && content) {
      writeSse(res, "token", { text: content });
    }
    if (data.usage) {
      writeSse(res, "usage", data.usage);
    }
  });
}

async function relayAnthropicStream(body, res) {
  await readSse(body, (event) => {
    const data = parseJson(event.data);
    if (!data) {
      return;
    }
    if (data.type === "error") {
      writeSse(res, "error", { message: data.error?.message || "Anthropic stream error", details: data.error });
      return;
    }
    if (data.type === "content_block_delta") {
      const delta = data.delta || {};
      if (typeof delta.thinking === "string" && delta.thinking) {
        writeSse(res, "reasoning", { text: delta.thinking });
      }
      if (typeof delta.text === "string" && delta.text) {
        writeSse(res, "token", { text: delta.text });
      }
    }
    if (data.type === "message_delta" && data.usage) {
      writeSse(res, "usage", data.usage);
    }
  });
}

async function relayGeminiStream(body, res) {
  await readSse(body, (event) => {
    const data = parseJson(event.data);
    if (!data) {
      return;
    }
    if (data.error) {
      writeSse(res, "error", { message: data.error.message || "Gemini stream error", details: data.error });
      return;
    }
    for (const candidate of data.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (typeof part.text !== "string" || !part.text) {
          continue;
        }
        writeSse(res, part.thought ? "reasoning" : "token", { text: part.text });
      }
    }
    if (data.usageMetadata) {
      writeSse(res, "usage", data.usageMetadata);
    }
  });
}

async function readSse(body, onEvent) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split(/\r?\n\r?\n/);
    buffer = frames.pop() || "";
    for (const frame of frames) {
      const event = parseSseFrame(frame);
      if (!event || event.data === "[DONE]") {
        continue;
      }
      onEvent(event);
    }
  }

  if (buffer.trim()) {
    const event = parseSseFrame(buffer);
    if (event && event.data !== "[DONE]") {
      onEvent(event);
    }
  }
}

function parseSseFrame(frame) {
  const lines = frame.split(/\r?\n/);
  const data = [];
  let event = "message";

  for (const line of lines) {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
    }
    if (line.startsWith("data:")) {
      data.push(line.slice(5).trimStart());
    }
  }

  if (!data.length) {
    return null;
  }

  return { event, data: data.join("\n") };
}

function writeSse(res, event, data) {
  if (res.writableEnded) {
    return;
  }
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function safeErrorDetails(value) {
  if (!value) {
    return "";
  }
  return value.length > 2000 ? `${value.slice(0, 2000)}...` : value;
}

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
