const elements = {
  providerSelect: document.querySelector("#providerSelect"),
  modelInput: document.querySelector("#modelInput"),
  modelOptions: document.querySelector("#modelOptions"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  baseUrlInput: document.querySelector("#baseUrlInput"),
  temperatureInput: document.querySelector("#temperatureInput"),
  temperatureValue: document.querySelector("#temperatureValue"),
  topPInput: document.querySelector("#topPInput"),
  topPValue: document.querySelector("#topPValue"),
  maxTokensInput: document.querySelector("#maxTokensInput"),
  thinkingBudgetInput: document.querySelector("#thinkingBudgetInput"),
  thinkingToggle: document.querySelector("#thinkingToggle"),
  systemPromptInput: document.querySelector("#systemPromptInput"),
  docsLink: document.querySelector("#docsLink"),
  providerRail: document.querySelector("#providerRail"),
  providerMatrix: document.querySelector("#providerMatrix"),
  benchmarkGrid: document.querySelector("#benchmarkGrid"),
  messageList: document.querySelector("#messageList"),
  chatForm: document.querySelector("#chatForm"),
  promptInput: document.querySelector("#promptInput"),
  sendButton: document.querySelector("#sendButton"),
  stopStream: document.querySelector("#stopStream"),
  clearChat: document.querySelector("#clearChat"),
  runStatus: document.querySelector("#runStatus"),
  sessionTitle: document.querySelector("#sessionTitle"),
  dryRunBenchmark: document.querySelector("#dryRunBenchmark"),
  navItems: document.querySelectorAll(".nav-item"),
  views: {
    chat: document.querySelector("#chatView"),
    benchmarks: document.querySelector("#benchmarksView"),
    providers: document.querySelector("#providersView")
  }
};

const state = {
  providers: [],
  benchmarks: [],
  messages: [],
  activeProvider: null,
  abortController: null,
  busy: false
};

init();

async function init() {
  bindEvents();
  renderMessages();
  try {
    const response = await fetch("/api/providers");
    const data = await response.json();
    state.providers = data.providers || [];
    state.benchmarks = data.benchmarks || [];
    renderProviders();
    renderBenchmarks();
    setProvider(state.providers[0]?.id);
    setStatus("Ready");
  } catch (error) {
    setStatus(`Load failed: ${error.message}`);
  }
}

function bindEvents() {
  elements.providerSelect.addEventListener("change", () => setProvider(elements.providerSelect.value));
  elements.temperatureInput.addEventListener("input", syncSliderLabels);
  elements.topPInput.addEventListener("input", syncSliderLabels);
  elements.chatForm.addEventListener("submit", submitChat);
  elements.stopStream.addEventListener("click", stopStream);
  elements.clearChat.addEventListener("click", clearChat);
  elements.dryRunBenchmark.addEventListener("click", dryRunBenchmark);

  document.querySelectorAll(".prompt-chip").forEach((button) => {
    button.addEventListener("click", () => {
      elements.promptInput.value = button.dataset.prompt || "";
      elements.promptInput.focus();
    });
  });

  elements.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  elements.promptInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      elements.chatForm.requestSubmit();
    }
  });
}

function renderProviders() {
  elements.providerSelect.innerHTML = state.providers
    .map((provider) => `<option value="${escapeHtml(provider.id)}">${escapeHtml(provider.name)}</option>`)
    .join("");

  elements.providerRail.innerHTML = state.providers
    .map(
      (provider) => `
        <button class="provider-pill" data-provider="${escapeHtml(provider.id)}" type="button">
          <span>${escapeHtml(provider.name)}</span>
          <small>${escapeHtml(provider.adapter.replace("-compatible", ""))}</small>
        </button>
      `
    )
    .join("");

  elements.providerRail.querySelectorAll(".provider-pill").forEach((button) => {
    button.addEventListener("click", () => {
      switchView("chat");
      setProvider(button.dataset.provider);
    });
  });

  elements.providerMatrix.innerHTML = state.providers
    .map(
      (provider) => `
        <article class="provider-item">
          <h3>${escapeHtml(provider.name)}</h3>
          <p>${escapeHtml(provider.baseUrl)}</p>
          <div class="tag-row">
            ${provider.capabilities.map((capability) => `<span class="tag">${escapeHtml(capability)}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderBenchmarks() {
  elements.benchmarkGrid.innerHTML = state.benchmarks
    .map(
      (benchmark) => `
        <article class="benchmark-item">
          <h3>${escapeHtml(benchmark.name)}</h3>
          <p>${escapeHtml(benchmark.description)}</p>
          <div class="tag-row">
            ${benchmark.metrics.map((metric) => `<span class="tag">${escapeHtml(metric)}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function setProvider(providerId) {
  const provider = state.providers.find((item) => item.id === providerId) || state.providers[0];
  if (!provider) {
    return;
  }

  state.activeProvider = provider;
  elements.providerSelect.value = provider.id;
  elements.modelInput.value = provider.defaultModel;
  elements.baseUrlInput.value = provider.baseUrl;
  elements.docsLink.href = provider.docs;
  elements.modelOptions.innerHTML = provider.models
    .map((model) => `<option value="${escapeHtml(model)}"></option>`)
    .join("");

  document.querySelectorAll(".provider-pill").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.provider === provider.id);
  });

  elements.sessionTitle.textContent = `${provider.name} · ${provider.defaultModel}`;
}

function switchView(viewName) {
  Object.entries(elements.views).forEach(([name, element]) => {
    element.classList.toggle("is-hidden", name !== viewName);
  });
  elements.navItems.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewName);
  });
}

async function submitChat(event) {
  event.preventDefault();
  if (state.busy) {
    return;
  }

  const prompt = elements.promptInput.value.trim();
  if (!prompt) {
    setStatus("Prompt is empty");
    return;
  }

  if (!elements.apiKeyInput.value.trim()) {
    setStatus("API key is required");
    elements.apiKeyInput.focus();
    return;
  }

  const userMessage = { role: "user", content: prompt };
  const assistantMessage = { role: "assistant", content: "", reasoning: "", usage: null };
  state.messages.push(userMessage, assistantMessage);
  elements.promptInput.value = "";
  renderMessages();
  setBusy(true);
  setStatus("Connecting");

  state.abortController = new AbortController();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
      signal: state.abortController.signal
    });

    if (!response.ok || !response.body) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || "Request failed");
    }

    await readEventStream(response.body, (eventName, data) => {
      if (eventName === "meta") {
        setStatus(`${data.providerName} · ${data.model}`);
      }
      if (eventName === "reasoning") {
        assistantMessage.reasoning += data.text || "";
        renderMessages();
      }
      if (eventName === "token") {
        assistantMessage.content += data.text || "";
        renderMessages();
      }
      if (eventName === "usage") {
        assistantMessage.usage = data;
        renderMessages();
      }
      if (eventName === "error") {
        assistantMessage.content += `\n\n[Error] ${data.message || "Request failed"}`;
        if (data.details) {
          assistantMessage.content += `\n${typeof data.details === "string" ? data.details : JSON.stringify(data.details)}`;
        }
        renderMessages();
        setStatus("Error");
      }
      if (eventName === "done") {
        setStatus(`Done · ${data.totalMs}ms`);
      }
    });
  } catch (error) {
    if (error.name !== "AbortError") {
      assistantMessage.content += `\n\n[Error] ${error.message}`;
      renderMessages();
      setStatus("Error");
    } else {
      setStatus("Stopped");
    }
  } finally {
    state.abortController = null;
    setBusy(false);
  }
}

function buildPayload() {
  return {
    providerId: elements.providerSelect.value,
    model: elements.modelInput.value.trim(),
    apiKey: elements.apiKeyInput.value.trim(),
    baseUrl: elements.baseUrlInput.value.trim(),
    systemPrompt: elements.systemPromptInput.value.trim(),
    messages: state.messages
      .filter((message) => message.role === "user" || (message.role === "assistant" && message.content))
      .map((message) => ({ role: message.role, content: message.content })),
    parameters: {
      temperature: Number(elements.temperatureInput.value),
      topP: Number(elements.topPInput.value),
      maxTokens: Number(elements.maxTokensInput.value),
      thinkingBudget: Number(elements.thinkingBudgetInput.value),
      thinkingEnabled: elements.thinkingToggle.checked
    }
  };
}

async function readEventStream(body, onEvent) {
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
      const parsed = parseSseFrame(frame);
      if (parsed) {
        onEvent(parsed.event, parsed.data);
      }
    }
  }
}

function parseSseFrame(frame) {
  let event = "message";
  const data = [];

  frame.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
    }
    if (line.startsWith("data:")) {
      data.push(line.slice(5).trimStart());
    }
  });

  if (!data.length) {
    return null;
  }

  try {
    return { event, data: JSON.parse(data.join("\n")) };
  } catch {
    return { event, data: data.join("\n") };
  }
}

function renderMessages() {
  if (!state.messages.length) {
    elements.messageList.innerHTML = `
      <div class="empty-state">
        <strong>选择厂商，填入 API Key，然后开始测试。</strong>
        <span>API Key 只随本次请求发送到本地代理，不写入磁盘。</span>
      </div>
    `;
    return;
  }

  elements.messageList.innerHTML = state.messages
    .map(
      (message) => `
        <article class="message ${escapeHtml(message.role)}">
          <div class="message-role">${message.role === "user" ? "You" : "Model"}</div>
          <div class="message-body">
            ${renderReasoning(message)}
            <div class="message-content">${renderMarkdown(message.content || "")}</div>
            ${message.usage ? `<div class="usage-line">${escapeHtml(formatUsage(message.usage))}</div>` : ""}
          </div>
        </article>
      `
    )
    .join("");
  elements.messageList.scrollTop = elements.messageList.scrollHeight;
}

function renderReasoning(message) {
  if (!message.reasoning) {
    return "";
  }

  return `
    <details class="reasoning-block" open>
      <summary>Reasoning</summary>
      <div class="reasoning-content">${escapeHtml(message.reasoning)}</div>
    </details>
  `;
}

function renderMarkdown(value) {
  const escaped = escapeHtml(value || "");
  const parts = escaped.split(/```/);
  return parts
    .map((part, index) => {
      if (index % 2 === 1) {
        return `<pre><code>${part.replace(/^\w+\n/, "")}</code></pre>`;
      }
      return part
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\n/g, "<br>");
    })
    .join("");
}

function formatUsage(usage) {
  const pairs = Object.entries(usage)
    .filter(([, value]) => typeof value === "number" || typeof value === "string")
    .slice(0, 6)
    .map(([key, value]) => `${key}: ${value}`);
  return pairs.join(" · ");
}

function clearChat() {
  if (state.busy) {
    stopStream();
  }
  state.messages = [];
  renderMessages();
  setStatus("Ready");
}

function stopStream() {
  if (state.abortController) {
    state.abortController.abort();
  }
}

async function dryRunBenchmark() {
  try {
    const response = await fetch("/api/benchmarks/run", { method: "POST" });
    const data = await response.json();
    setStatus(data.message || "Benchmark dry run queued");
    switchView("benchmarks");
  } catch (error) {
    setStatus(`Benchmark failed: ${error.message}`);
  }
}

function setBusy(value) {
  state.busy = value;
  elements.sendButton.disabled = value;
  elements.stopStream.disabled = !value;
}

function setStatus(value) {
  elements.runStatus.textContent = value;
}

function syncSliderLabels() {
  elements.temperatureValue.value = elements.temperatureInput.value;
  elements.topPValue.value = elements.topPInput.value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
