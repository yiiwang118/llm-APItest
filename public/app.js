/* ── api/studio — multi-model gateway frontend ───────────────────────────── */

const elements = {
  bootScreen: document.querySelector("#bootScreen"),
  appShell: document.querySelector("#appShell"),
  providerSelect: document.querySelector("#providerSelect"),
  modelInput: document.querySelector("#modelInput"),
  modelOptions: document.querySelector("#modelOptions"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  apiKeyToggle: document.querySelector("#apiKeyToggle"),
  baseUrlInput: document.querySelector("#baseUrlInput"),
  refreshModels: document.querySelector("#refreshModels"),
  modelStatus: document.querySelector("#modelStatus"),
  temperatureInput: document.querySelector("#temperatureInput"),
  temperatureValue: document.querySelector("#temperatureValue"),
  topPInput: document.querySelector("#topPInput"),
  topPValue: document.querySelector("#topPValue"),
  maxTokensInput: document.querySelector("#maxTokensInput"),
  maxTokensUnlimited: document.querySelector("#maxTokensUnlimited"),
  thinkingBudgetInput: document.querySelector("#thinkingBudgetInput"),
  thinkingBudgetUnlimited: document.querySelector("#thinkingBudgetUnlimited"),
  reasoningEffortSelect: document.querySelector("#reasoningEffortSelect"),
  thinkingToggle: document.querySelector("#thinkingToggle"),
  systemPromptInput: document.querySelector("#systemPromptInput"),
  docsLink: document.querySelector("#docsLink"),
  providerRail: document.querySelector("#providerRail"),
  providerMatrix: document.querySelector("#providerMatrix"),
  benchmarkGrid: document.querySelector("#benchmarkGrid"),
  messageList: document.querySelector("#messageList"),
  chatForm: document.querySelector("#chatForm"),
  promptInput: document.querySelector("#promptInput"),
  attachmentInput: document.querySelector("#attachmentInput"),
  attachmentTray: document.querySelector("#attachmentTray"),
  sendButton: document.querySelector("#sendButton"),
  stopStream: document.querySelector("#stopStream"),
  saveRecord: document.querySelector("#saveRecord"),
  clearChat: document.querySelector("#clearChat"),
  newSession: document.querySelector("#newSession"),
  runStatus: document.querySelector("#runStatus"),
  runStatusLabel: document.querySelector("#runStatus .run-label"),
  sessionTitle: document.querySelector("#sessionTitle"),
  sessionMeta: document.querySelector("#sessionMeta"),
  dryRunBenchmark: document.querySelector("#dryRunBenchmark"),
  languageToggle: document.querySelector("#languageToggle"),
  themeToggle: document.querySelector("#themeToggle"),
  brandSubtitle: document.querySelector("#brandSubtitle"),
  recordList: document.querySelector("#recordList"),
  userBadge: document.querySelector("#userBadge"),
  logoutButton: document.querySelector("#logoutButton"),
  navItems: document.querySelectorAll(".nav-item"),
  translatable: document.querySelectorAll("[data-i18n]"),
  promptChips: document.querySelectorAll(".prompt-chip"),
  views: {
    chat: document.querySelector("#chatView"),
    benchmarks: document.querySelector("#benchmarksView"),
    providers: document.querySelector("#providersView")
  }
};

const translations = {
  en: {
    brandSubtitle: "multi-model gateway",
    navChat: "Playground",
    navBenchmark: "Benchmarks",
    navProviders: "Providers",
    history: "history",
    providerRail: "providers",
    parameters: "Parameters",
    clear: "clear",
    save: "save",
    saved: "saved",
    saveFailed: "save failed",
    stop: "stop",
    logout: "exit",
    newSession: "New session",
    recordsEmpty: "// no saved records",
    deleteRecord: "Delete",
    attachments: "Attachments",
    removeAttachment: "Remove",
    unsupportedFile: "Only images and text files supported",
    fileTooLarge: "File too large",
    send: "send",
    benchmarkEyebrow: "evaluation",
    benchmarkTitle: "Benchmark Framework",
    dryRun: "dry run",
    registryEyebrow: "registry",
    providerTitle: "Provider Matrix",
    model: "Model",
    provider: "Provider",
    refreshModels: "refresh",
    endpoint: "Endpoint",
    temperature: "Temperature",
    maxTokens: "Max tokens",
    thinkBudget: "Think budget",
    reasoningEffort: "Reasoning effort",
    unlimited: "unlimited",
    showReasoning: "Stream reasoning",
    systemPrompt: "System instructions",
    providerDocs: "provider docs",
    ready: "ready",
    connecting: "connecting",
    streaming: "streaming",
    stopped: "stopped",
    error: "error",
    done: "done",
    promptEmpty: "Prompt is empty",
    apiKeyRequired: "API key required",
    loadFailed: "Load failed",
    modelRefreshIdle: "Using bundled model list",
    modelRefreshNeedKey: "Add API key, then refresh latest models",
    modelRefreshReady: "Refresh to load latest supported models",
    modelRefreshing: "Refreshing models",
    modelRefreshDone: "Live model list loaded",
    modelRefreshCounts: "live {live} · total {total} · new {added}",
    modelRefreshError: "Model refresh failed",
    fallbackApplied: "Fallback models still available",
    promptPlaceholder: "Message the selected model — ⌘ Enter to send",
    systemPlaceholder: "You are a helpful assistant.",
    emptyTitle: "Probe any model.",
    emptyTitleAccent: "One playground.",
    emptyBody:
      "Pick a provider, drop in your key, and start streaming. Reasoning, tools, and multimodal — all wired through one console.",
    emptyMetaProviders: "<b>10</b> providers",
    emptyMetaStream: "<b>SSE</b> streaming",
    emptyMetaThink: "<b>thinking</b> mode",
    emptyMetaMulti: "<b>multimodal</b>",
    you: "you",
    modelRole: "model",
    reasoning: "reasoning",
    copy: "copy",
    copied: "copied",
    promptIntroLabel: "Model intro",
    promptReasoningLabel: "Reasoning test",
    promptSplitLabel: "Task split",
    promptIntro: "Introduce the positioning of your current model in three sentences.",
    promptReasoning: "Give me a short reasoning test question and answer it.",
    promptSplit: "Split the following requirement into backend, frontend, and testing tasks:",
    benchmarkFailed: "Benchmark failed",
    benchmarkQueued: "Benchmark dry run queued"
  },
  zh: {
    brandSubtitle: "multi-model gateway",
    navChat: "对话",
    navBenchmark: "评测",
    navProviders: "厂商",
    history: "历史",
    providerRail: "厂商",
    parameters: "参数",
    clear: "清空",
    save: "保存",
    saved: "已保存",
    saveFailed: "保存失败",
    stop: "停止",
    logout: "退出",
    newSession: "新建会话",
    recordsEmpty: "// 暂无保存记录",
    deleteRecord: "删除",
    attachments: "附件",
    removeAttachment: "移除",
    unsupportedFile: "本地上传仅支持图片和文本",
    fileTooLarge: "文件过大",
    send: "发送",
    benchmarkEyebrow: "评测",
    benchmarkTitle: "Benchmark 框架",
    dryRun: "试运行",
    registryEyebrow: "注册表",
    providerTitle: "厂商矩阵",
    model: "模型",
    provider: "厂商",
    refreshModels: "刷新",
    endpoint: "接口",
    temperature: "温度",
    maxTokens: "最大 tokens",
    thinkBudget: "思考预算",
    reasoningEffort: "推理强度",
    unlimited: "无限制",
    showReasoning: "展示思考流",
    systemPrompt: "System 指令",
    providerDocs: "厂商文档",
    ready: "就绪",
    connecting: "连接中",
    streaming: "流式输出",
    stopped: "已停止",
    error: "错误",
    done: "完成",
    promptEmpty: "请输入消息",
    apiKeyRequired: "需要 API Key",
    loadFailed: "加载失败",
    modelRefreshIdle: "正在使用内置模型列表",
    modelRefreshNeedKey: "填入 API Key 后刷新最新模型",
    modelRefreshReady: "点击刷新加载最新支持模型",
    modelRefreshing: "正在刷新模型",
    modelRefreshDone: "已加载实时模型列表",
    modelRefreshCounts: "实时 {live} · 合计 {total} · 新增 {added}",
    modelRefreshError: "模型刷新失败",
    fallbackApplied: "仍可使用内置模型列表",
    promptPlaceholder: "向选中的模型发送消息 — ⌘ Enter 发送",
    systemPlaceholder: "You are a helpful assistant.",
    emptyTitle: "探针任意模型。",
    emptyTitleAccent: "一个工作台。",
    emptyBody: "选厂商、填 key，开始流式输出。思考流、工具、多模态——一台控制台全部接通。",
    emptyMetaProviders: "<b>10</b> 家厂商",
    emptyMetaStream: "<b>SSE</b> 流式",
    emptyMetaThink: "<b>thinking</b> 思考模式",
    emptyMetaMulti: "<b>多模态</b>",
    you: "你",
    modelRole: "模型",
    reasoning: "思考过程",
    copy: "复制",
    copied: "已复制",
    promptIntroLabel: "模型介绍",
    promptReasoningLabel: "推理测试",
    promptSplitLabel: "任务拆解",
    promptIntro: "用三句话介绍一下你当前模型的定位。",
    promptReasoning: "给我一个用于测试推理能力的简短题目，并回答。",
    promptSplit: "把下面这段需求拆成后端、前端、测试三个任务：",
    benchmarkFailed: "Benchmark 失败",
    benchmarkQueued: "Benchmark 试运行已排队"
  }
};

const PROVIDER_INITIALS = {
  openai: "OAI",
  anthropic: "ANT",
  google: "GEM",
  zhipu: "GLM",
  qwen: "QWN",
  deepseek: "DSK",
  xiaomi: "MIM",
  minimax: "MMX",
  siliconflow: "SF",
  openrouter: "OR"
};

const ALLOWED_USER = "yiiwang";

const state = {
  language: localStorage.getItem("apiStudioLanguage") || "zh",
  theme: localStorage.getItem("apiStudioTheme") || "dark",
  providers: [],
  benchmarks: [],
  records: [],
  messages: [],
  attachments: [],
  modelLists: {},
  activeProvider: null,
  currentRecordId: null,
  user: "",
  abortController: null,
  busy: false,
  modelBusy: false,
  modelRefreshTimer: null,
  modelRefreshSignatures: {},
  apiKeys: {}
};

init();

async function init() {
  applyTheme();
  bindEvents();
  applyLanguage();
  await silentLogin();
  hideBoot();
  await loadAppData();
  renderMessages();
}

async function silentLogin() {
  try {
    const session = await fetch("/api/session").then((r) => r.json());
    if (session.authenticated && session.user) {
      state.user = session.user;
      return;
    }
  } catch {}
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: ALLOWED_USER })
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.user) {
      state.user = data.user;
    }
  } catch (error) {
    console.warn("login failed", error);
  }
}

function hideBoot() {
  if (!elements.bootScreen) return;
  elements.bootScreen.classList.add("is-fading");
  elements.appShell.classList.remove("is-hidden");
  setTimeout(() => elements.bootScreen?.remove(), 220);
}

async function loadAppData() {
  try {
    const [providerResponse, recordResponse] = await Promise.all([
      fetch("/api/providers"),
      fetch("/api/records")
    ]);
    if (providerResponse.status === 401 || recordResponse.status === 401) {
      await silentLogin();
      return loadAppData();
    }
    const data = await providerResponse.json();
    const recordData = await recordResponse.json();
    state.providers = data.providers || [];
    state.benchmarks = data.benchmarks || [];
    state.records = recordData.records || [];
    state.providers.forEach((provider) => {
      state.modelLists[provider.id] = normalizeModelOptions(provider.models);
    });
    if (state.user) {
      elements.userBadge.textContent = state.user;
    }
    renderProviders();
    renderBenchmarks();
    renderRecords();
    setProvider(state.providers[0]?.id);
    setRunState("ready", t("ready"));
  } catch (error) {
    setRunState("error", `${t("loadFailed")}: ${error.message}`);
  }
}

function bindEvents() {
  elements.providerSelect.addEventListener("change", () => setProvider(elements.providerSelect.value));
  elements.modelInput.addEventListener("input", updateSessionMeta);
  elements.refreshModels.addEventListener("click", () => refreshModels({ force: true }));
  elements.apiKeyInput.addEventListener("input", () => {
    if (state.activeProvider) {
      state.apiKeys[state.activeProvider.id] = elements.apiKeyInput.value;
    }
    if (elements.apiKeyInput.value.trim()) {
      setModelStatus(t("modelRefreshReady"), false);
    }
    scheduleModelRefresh();
  });
  elements.apiKeyInput.addEventListener("change", scheduleModelRefresh);
  elements.apiKeyToggle.addEventListener("click", toggleApiKeyReveal);
  elements.baseUrlInput.addEventListener("change", scheduleModelRefresh);
  elements.temperatureInput.addEventListener("input", syncSliderLabels);
  elements.topPInput.addEventListener("input", syncSliderLabels);
  elements.maxTokensUnlimited.addEventListener("change", syncUnlimitedControls);
  elements.thinkingBudgetUnlimited.addEventListener("change", syncUnlimitedControls);
  elements.attachmentInput.addEventListener("change", handleAttachmentFiles);
  elements.chatForm.addEventListener("submit", submitChat);
  elements.stopStream.addEventListener("click", stopStream);
  elements.saveRecord.addEventListener("click", () => saveCurrentRecord(false));
  elements.clearChat.addEventListener("click", clearChat);
  elements.newSession.addEventListener("click", clearChat);
  elements.dryRunBenchmark.addEventListener("click", dryRunBenchmark);
  elements.languageToggle.addEventListener("click", toggleLanguage);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.logoutButton.addEventListener("click", logout);

  elements.attachmentTray.addEventListener("click", (event) => {
    const removeBtn = event.target.closest("[data-remove-attachment]");
    if (removeBtn) removeAttachment(removeBtn.dataset.removeAttachment);
  });

  elements.recordList.addEventListener("click", (event) => {
    const recordButton = event.target.closest("[data-record-id]");
    const deleteButton = event.target.closest("[data-delete-record]");
    if (deleteButton) {
      deleteRecord(deleteButton.dataset.deleteRecord);
      return;
    }
    if (recordButton) loadRecord(recordButton.dataset.recordId);
  });

  elements.messageList.addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) handleCopy(copyButton);
    const messageCopy = event.target.closest("[data-copy-message]");
    if (messageCopy) handleMessageCopy(messageCopy);
  });

  elements.promptChips.forEach((button) => {
    button.addEventListener("click", () => {
      elements.promptInput.value = t(button.dataset.promptKey || "");
      elements.promptInput.focus();
    });
  });

  elements.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  elements.promptInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      elements.chatForm.requestSubmit();
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && /^[123]$/.test(event.key)) {
      const map = { 1: "chat", 2: "benchmarks", 3: "providers" };
      switchView(map[event.key]);
      event.preventDefault();
    }
  });
}

async function logout() {
  await fetch("/api/logout", { method: "POST" }).catch(() => {});
  // Re-login silently to keep things continuous.
  await silentLogin();
  await loadAppData();
}

/* ─── Theme + language ───────────────────────────────────────────────────── */

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("apiStudioTheme", state.theme);
  applyTheme();
}

function applyLanguage() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  elements.languageToggle.textContent = state.language === "zh" ? "EN" : "中文";
  elements.brandSubtitle.textContent = t("brandSubtitle");
  elements.promptInput.placeholder = t("promptPlaceholder");
  elements.systemPromptInput.placeholder = t("systemPlaceholder");
  elements.sessionTitle.textContent = t("navChat");

  elements.translatable.forEach((element) => {
    const key = element.dataset.i18n;
    if (key) element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    if (key) element.title = t(key);
  });

  elements.promptChips.forEach((button) => {
    const span = button.querySelector("span:last-child");
    if (span) span.textContent = t(`${button.dataset.promptKey}Label`);
  });

  syncUnlimitedControls();

  if (!state.busy) setRunState("ready", t("ready"));

  if (state.activeProvider) {
    setModelStatus(modelStatusForProvider(), false);
  }

  renderMessages();
  renderRecords();
}

function toggleLanguage() {
  state.language = state.language === "zh" ? "en" : "zh";
  localStorage.setItem("apiStudioLanguage", state.language);
  applyLanguage();
  renderProviders();
  renderBenchmarks();
}

/* ─── Provider rendering ─────────────────────────────────────────────────── */

function renderProviders() {
  elements.providerSelect.innerHTML = state.providers
    .map((provider) => `<option value="${escapeHtml(provider.id)}">${escapeHtml(provider.name)}</option>`)
    .join("");

  elements.providerRail.innerHTML = state.providers
    .map((provider) => `
      <button class="provider-pill" data-provider="${escapeHtml(provider.id)}" type="button">
        <span class="pill-mark">${escapeHtml(providerInitials(provider))}</span>
        <span class="pill-name">${escapeHtml(provider.name)}</span>
        <span class="pill-tag">${escapeHtml(capabilityLabel(provider))}</span>
      </button>
    `)
    .join("");

  elements.providerRail.querySelectorAll(".provider-pill").forEach((button) => {
    button.addEventListener("click", () => {
      switchView("chat");
      setProvider(button.dataset.provider);
    });
  });

  elements.providerMatrix.innerHTML = state.providers
    .map((provider) => `
      <article class="provider-item">
        <div class="provider-card-head">
          <span class="provider-mark">${escapeHtml(providerInitials(provider))}</span>
          <div class="provider-card-title">
            <span class="card-kicker">${escapeHtml(provider.adapter.replace("-compatible", " · openai"))}</span>
            <h3>${escapeHtml(provider.name)}</h3>
          </div>
        </div>
        <p class="provider-base">${escapeHtml(provider.baseUrl)}</p>
        <div class="tag-row">
          ${(provider.capabilities || [])
            .map((capability) => `<span class="tag">${escapeHtml(capability)}</span>`)
            .join("")}
        </div>
      </article>
    `)
    .join("");

  if (state.activeProvider) {
    elements.providerSelect.value = state.activeProvider.id;
    markActiveProvider();
  }
}

function renderRecords() {
  if (!state.records.length) {
    elements.recordList.innerHTML = `<div class="record-empty">${escapeHtml(t("recordsEmpty"))}</div>`;
    return;
  }

  elements.recordList.innerHTML = state.records
    .map((record) => `
      <div class="record-item ${record.id === state.currentRecordId ? "is-active" : ""}">
        <button class="record-open" type="button" data-record-id="${escapeHtml(record.id)}">
          <span>${escapeHtml(record.title || "Untitled")}</span>
          <small>${escapeHtml(record.model || record.providerId || "")}</small>
        </button>
        <button class="record-delete" type="button" data-delete-record="${escapeHtml(record.id)}" title="${escapeHtml(t("deleteRecord"))}">×</button>
      </div>
    `)
    .join("");
}

/* ─── Attachments ────────────────────────────────────────────────────────── */

async function handleAttachmentFiles(event) {
  const files = Array.from(event.target.files || []);
  for (const file of files) {
    try {
      const attachment = await readAttachment(file);
      state.attachments.push(attachment);
    } catch (error) {
      setRunState("error", error.message);
    }
  }
  elements.attachmentInput.value = "";
  renderAttachments();
}

function readAttachment(file) {
  const isImage = file.type.startsWith("image/");
  const isText =
    file.type.startsWith("text/") ||
    file.type === "application/json" ||
    /\.(txt|md|csv|json)$/i.test(file.name);
  const imageLimit = 4 * 1024 * 1024;
  const textLimit = 250 * 1024;

  if (isImage) {
    if (file.size > imageLimit) {
      return Promise.reject(new Error(`${t("fileTooLarge")}: ${file.name}`));
    }
    return readFile(file, "dataUrl").then((dataUrl) => ({
      id: crypto.randomUUID(),
      kind: "image",
      name: file.name,
      mimeType: file.type || "image/png",
      size: file.size,
      dataUrl
    }));
  }

  if (isText) {
    if (file.size > textLimit) {
      return Promise.reject(new Error(`${t("fileTooLarge")}: ${file.name}`));
    }
    return readFile(file, "text").then((text) => ({
      id: crypto.randomUUID(),
      kind: "text",
      name: file.name,
      mimeType: file.type || "text/plain",
      size: file.size,
      text
    }));
  }

  return Promise.reject(new Error(`${t("unsupportedFile")}: ${file.name}`));
}

function readFile(file, mode) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
    if (mode === "dataUrl") reader.readAsDataURL(file);
    else reader.readAsText(file);
  });
}

function renderAttachments() {
  if (!state.attachments.length) {
    elements.attachmentTray.innerHTML = "";
    return;
  }
  elements.attachmentTray.innerHTML = state.attachments
    .map((attachment) => `
      <div class="attachment-chip">
        ${
          attachment.kind === "image"
            ? `<img src="${escapeHtml(attachment.dataUrl)}" alt="" />`
            : `<span class="file-icon">${attachment.name.split(".").pop().slice(0, 3).toUpperCase() || "TXT"}</span>`
        }
        <span class="chip-name">${escapeHtml(attachment.name)}</span>
        <button type="button" data-remove-attachment="${escapeHtml(attachment.id)}" title="${escapeHtml(t("removeAttachment"))}">×</button>
      </div>
    `)
    .join("");
}

function removeAttachment(attachmentId) {
  state.attachments = state.attachments.filter((attachment) => attachment.id !== attachmentId);
  renderAttachments();
}

/* ─── Benchmarks ─────────────────────────────────────────────────────────── */

function renderBenchmarks() {
  elements.benchmarkGrid.innerHTML = state.benchmarks
    .map((benchmark) => `
      <article class="benchmark-item">
        <div class="card-kicker">${escapeHtml(benchmark.status || "planned")} · ${String(benchmark.id || "").toUpperCase()}</div>
        <h3>${escapeHtml(benchmark.name)}</h3>
        <p>${escapeHtml(benchmark.description)}</p>
        <div class="tag-row">
          ${(benchmark.metrics || [])
            .map((metric) => `<span class="tag">${escapeHtml(metric)}</span>`)
            .join("")}
        </div>
      </article>
    `)
    .join("");
}

/* ─── Provider state ─────────────────────────────────────────────────────── */

function setProvider(providerId) {
  const provider = state.providers.find((item) => item.id === providerId) || state.providers[0];
  if (!provider) return;

  state.activeProvider = provider;
  elements.providerSelect.value = provider.id;
  elements.baseUrlInput.value = provider.baseUrl;
  elements.docsLink.href = provider.docs;
  elements.apiKeyInput.value = state.apiKeys[provider.id] || "";
  renderModelOptions(provider.id, provider.defaultModel);
  markActiveProvider();
  updateSessionMeta();
  setModelStatus(modelStatusForProvider(), false);
  scheduleModelRefresh();
}

function renderModelOptions(providerId, selectedModel) {
  const provider = state.providers.find((item) => item.id === providerId);
  const models = state.modelLists[providerId] || normalizeModelOptions(provider?.models || []);
  const preferred = selectedModel || elements.modelInput.value || provider?.defaultModel || models[0]?.id || "";
  const hasPreferred = models.some((model) => model.id === preferred);
  const finalModels = hasPreferred || !preferred ? models : [{ id: preferred, name: preferred }, ...models];

  elements.modelOptions.innerHTML = finalModels
    .map((model) => `<option value="${escapeHtml(model.id)}" label="${escapeHtml(model.name || model.id)}"></option>`)
    .join("");
  elements.modelInput.value = preferred;
}

function scheduleModelRefresh() {
  if (!state.activeProvider || state.modelBusy) return;
  const hasApiKey = Boolean(elements.apiKeyInput.value.trim());
  if (!hasApiKey && state.activeProvider.id !== "openrouter") return;

  window.clearTimeout(state.modelRefreshTimer);
  state.modelRefreshTimer = window.setTimeout(() => refreshModels({ silent: true }), 700);
}

async function refreshModels(options = {}) {
  if (!state.activeProvider || state.modelBusy) return;

  const force = options.force === true;
  const silent = options.silent === true;
  const signature = [
    state.activeProvider.id,
    elements.baseUrlInput.value.trim(),
    elements.apiKeyInput.value.trim()
  ].join("|");

  if (!force && state.modelRefreshSignatures[state.activeProvider.id] === signature) return;
  window.clearTimeout(state.modelRefreshTimer);

  state.modelBusy = true;
  elements.refreshModels.disabled = true;
  if (!silent) setModelStatus(`${t("modelRefreshing")}...`, false);

  try {
    const response = await fetch("/api/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerId: state.activeProvider.id,
        apiKey: elements.apiKeyInput.value.trim(),
        baseUrl: elements.baseUrlInput.value.trim()
      })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (data.fallbackModels?.length) {
        state.modelLists[state.activeProvider.id] = normalizeModelOptions(data.fallbackModels);
        renderModelOptions(state.activeProvider.id, state.activeProvider.defaultModel);
      }
      setModelStatus(`${t("modelRefreshError")}: ${formatErrorPayload(data)}. ${t("fallbackApplied")}`, true);
      return;
    }

    state.modelRefreshSignatures[state.activeProvider.id] = signature;
    state.modelLists[state.activeProvider.id] = normalizeModelOptions(data.models || []);
    renderModelOptions(state.activeProvider.id, elements.modelInput.value || state.activeProvider.defaultModel);
    updateSessionMeta();
    setModelStatus(`${t("modelRefreshDone")} · ${modelRefreshCounts(data, state.modelLists[state.activeProvider.id].length)}`, false);
  } catch (error) {
    setModelStatus(`${t("modelRefreshError")}: ${error.message}`, true);
  } finally {
    state.modelBusy = false;
    elements.refreshModels.disabled = false;
  }
}

/* ─── Records ────────────────────────────────────────────────────────────── */

async function saveCurrentRecord(quiet) {
  if (!state.messages.length) {
    setRunState("error", t("promptEmpty"));
    return;
  }
  try {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildRecordPayload())
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || response.statusText);

    state.currentRecordId = data.record.id;
    const index = state.records.findIndex((record) => record.id === data.record.id);
    if (index >= 0) state.records[index] = data.record;
    else state.records.unshift(data.record);
    state.records.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
    renderRecords();
    if (!quiet) setRunState("ready", t("saved"));
  } catch (error) {
    setRunState("error", `${t("saveFailed")}: ${error.message}`);
  }
}

function buildRecordPayload() {
  return {
    id: state.currentRecordId,
    title: titleFromMessages(),
    providerId: elements.providerSelect.value,
    model: elements.modelInput.value.trim(),
    baseUrl: elements.baseUrlInput.value.trim(),
    systemPrompt: elements.systemPromptInput.value.trim(),
    parameters: collectParameters(),
    messages: state.messages
  };
}

function titleFromMessages() {
  const firstUserMessage = state.messages.find((message) => message.role === "user" && message.content);
  return (firstUserMessage?.content || "Untitled").replace(/\s+/g, " ").slice(0, 72);
}

function loadRecord(recordId) {
  const record = state.records.find((item) => item.id === recordId);
  if (!record) return;
  state.currentRecordId = record.id;
  if (record.providerId) setProvider(record.providerId);
  if (record.model) renderModelOptions(record.providerId || elements.providerSelect.value, record.model);
  elements.baseUrlInput.value = record.baseUrl || elements.baseUrlInput.value;
  elements.systemPromptInput.value = record.systemPrompt || "";
  applyRecordParameters(record.parameters || {});
  state.messages = Array.isArray(record.messages) ? record.messages : [];
  renderMessages();
  renderRecords();
  switchView("chat");
  setRunState("ready", t("ready"));
}

function applyRecordParameters(parameters) {
  if (parameters.temperature !== undefined) elements.temperatureInput.value = parameters.temperature;
  if (parameters.topP !== undefined) elements.topPInput.value = parameters.topP;
  if (hasOwn(parameters, "maxTokens")) {
    elements.maxTokensUnlimited.checked = parameters.maxTokens === null;
    elements.maxTokensInput.value = parameters.maxTokens === null ? "" : parameters.maxTokens;
  }
  if (hasOwn(parameters, "thinkingBudget")) {
    elements.thinkingBudgetUnlimited.checked = parameters.thinkingBudget === null;
    elements.thinkingBudgetInput.value = parameters.thinkingBudget === null ? "" : parameters.thinkingBudget;
  }
  if (parameters.reasoningEffort) {
    elements.reasoningEffortSelect.value = parameters.reasoningEffort;
  }
  elements.thinkingToggle.checked = Boolean(parameters.thinkingEnabled);
  syncSliderLabels();
  syncUnlimitedControls();
}

async function deleteRecord(recordId) {
  try {
    const response = await fetch(`/api/records/${encodeURIComponent(recordId)}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || response.statusText);
    }
    state.records = state.records.filter((record) => record.id !== recordId);
    if (state.currentRecordId === recordId) state.currentRecordId = null;
    renderRecords();
  } catch (error) {
    setRunState("error", `${t("saveFailed")}: ${error.message}`);
  }
}

function switchView(viewName) {
  if (!viewName || !elements.views[viewName]) return;
  Object.entries(elements.views).forEach(([name, element]) => {
    element.classList.toggle("is-hidden", name !== viewName);
  });
  elements.navItems.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewName);
  });
}

/* ─── Chat / streaming ───────────────────────────────────────────────────── */

async function submitChat(event) {
  event.preventDefault();
  if (state.busy) return;

  const prompt = elements.promptInput.value.trim();
  if (!prompt && !state.attachments.length) {
    setRunState("error", t("promptEmpty"));
    return;
  }
  if (!elements.apiKeyInput.value.trim()) {
    setRunState("error", t("apiKeyRequired"));
    elements.apiKeyInput.focus();
    return;
  }

  const userMessage = { role: "user", content: prompt, attachments: state.attachments };
  const assistantMessage = { role: "assistant", content: "", reasoning: "", usage: null, streaming: true };
  state.messages.push(userMessage, assistantMessage);
  elements.promptInput.value = "";
  state.attachments = [];
  renderAttachments();
  renderMessages();
  setBusy(true);
  setRunState("connecting", t("connecting"));

  state.abortController = new AbortController();
  let streamCompleted = false;
  let streamFailed = false;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
      signal: state.abortController.signal
    });

    if (!response.ok || !response.body) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(formatErrorPayload(error) || "Request failed");
    }

    await readEventStream(response.body, (eventName, data) => {
      if (eventName === "meta") {
        setRunState("streaming", `${data.providerName} · ${data.model}`);
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
        streamFailed = true;
        assistantMessage.content += `\n\n[${t("error")}] ${data.message || "Request failed"}`;
        if (data.details) {
          assistantMessage.content += `\n\`\`\`\n${typeof data.details === "string" ? data.details : JSON.stringify(data.details, null, 2)}\n\`\`\``;
        }
        assistantMessage.streaming = false;
        renderMessages();
        setRunState("error", t("error"));
      }
      if (eventName === "done") {
        streamCompleted = true;
        assistantMessage.streaming = false;
        renderMessages();
        setRunState("ready", `${t("done")} · ${data.totalMs}ms`);
        if (state.currentRecordId) saveCurrentRecord(true);
      }
    });
    if (!streamCompleted && !streamFailed) {
      assistantMessage.streaming = false;
      renderMessages();
      setRunState("ready", t("done"));
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      assistantMessage.content += `\n\n[${t("error")}] ${error.message}`;
      assistantMessage.streaming = false;
      renderMessages();
      setRunState("error", t("error"));
    } else {
      assistantMessage.streaming = false;
      renderMessages();
      setRunState("ready", t("stopped"));
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
      .map((message) => ({
        role: message.role,
        content: message.content,
        attachments: message.attachments || []
      })),
    parameters: collectParameters()
  };
}

function collectParameters() {
  return {
    temperature: Number(elements.temperatureInput.value),
    topP: Number(elements.topPInput.value),
    maxTokens: optionalNumberValue(elements.maxTokensInput, elements.maxTokensUnlimited),
    thinkingBudget: optionalNumberValue(elements.thinkingBudgetInput, elements.thinkingBudgetUnlimited),
    thinkingEnabled: elements.thinkingToggle.checked,
    reasoningEffort: elements.reasoningEffortSelect.value
  };
}

async function readEventStream(body, onEvent) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split(/\r?\n\r?\n/);
    buffer = frames.pop() || "";

    for (const frame of frames) {
      const parsed = parseSseFrame(frame);
      if (parsed) onEvent(parsed.event, parsed.data);
    }
  }

  if (buffer.trim()) {
    const parsed = parseSseFrame(buffer);
    if (parsed) onEvent(parsed.event, parsed.data);
  }
}

function parseSseFrame(frame) {
  let event = "message";
  const data = [];

  frame.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
  });

  if (!data.length) return null;
  try {
    return { event, data: JSON.parse(data.join("\n")) };
  } catch {
    return { event, data: data.join("\n") };
  }
}

/* ─── Message list rendering ─────────────────────────────────────────────── */

function renderMessages() {
  if (!state.messages.length) {
    elements.messageList.innerHTML = `
      <div class="empty-state">
        <div class="empty-card">
          <div class="empty-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="8" height="8"/>
              <rect x="13" y="3" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <rect x="3" y="13" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <rect x="13" y="13" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.6"/>
            </svg>
          </div>
          <strong>${escapeHtml(t("emptyTitle"))} <em>${escapeHtml(t("emptyTitleAccent"))}</em></strong>
          <p>${escapeHtml(t("emptyBody"))}</p>
          <div class="empty-meta">
            <span>${t("emptyMetaProviders")}</span>
            <span>${t("emptyMetaStream")}</span>
            <span>${t("emptyMetaThink")}</span>
            <span>${t("emptyMetaMulti")}</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  elements.messageList.innerHTML = state.messages.map(renderSingleMessage).join("");
  elements.messageList.scrollTop = elements.messageList.scrollHeight;
}

function renderSingleMessage(message, index) {
  const roleLabel = message.role === "user" ? t("you") : t("modelRole");
  const roleMark = message.role === "user" ? "U" : "M";
  return `
    <article class="message ${escapeHtml(message.role)}" data-index="${index}">
      <div class="message-head">
        <span class="role-mark">${roleMark}</span>
        <span>${escapeHtml(roleLabel)}</span>
        ${message.streaming ? `<span class="head-state">${escapeHtml(t("streaming"))}</span>` : ""}
      </div>
      <div class="message-body">
        ${renderReasoning(message)}
        ${renderMessageAttachments(message)}
        <div class="message-content">${renderMarkdown(message.content || "")}${message.streaming ? '<span class="stream-cursor"></span>' : ""}</div>
        ${message.usage ? `<div class="usage-line">${renderUsage(message.usage)}</div>` : ""}
        ${message.role === "assistant" && message.content
          ? `<div class="message-actions">
              <button class="message-action" type="button" data-copy-message="${index}">${escapeHtml(t("copy"))}</button>
            </div>`
          : ""}
      </div>
    </article>
  `;
}

function renderMessageAttachments(message) {
  if (!message.attachments?.length) return "";
  return `
    <div class="message-attachments">
      ${message.attachments
        .map((attachment) =>
          attachment.kind === "image"
            ? `<img src="${escapeHtml(attachment.dataUrl)}" alt="${escapeHtml(attachment.name)}" />`
            : `<span>📎 ${escapeHtml(attachment.name)}</span>`
        )
        .join("")}
    </div>
  `;
}

function renderReasoning(message) {
  if (!message.reasoning) return "";
  return `
    <details class="reasoning-block" open>
      <summary>${escapeHtml(t("reasoning"))}</summary>
      <div class="reasoning-content">${escapeHtml(message.reasoning)}</div>
    </details>
  `;
}

function renderUsage(usage) {
  return Object.entries(usage)
    .filter(([, value]) => typeof value === "number" || typeof value === "string")
    .slice(0, 6)
    .map(([key, value]) => `<span><b>${escapeHtml(key)}:</b>${escapeHtml(String(value))}</span>`)
    .join(" ");
}

function handleMessageCopy(button) {
  const index = Number(button.dataset.copyMessage);
  const message = state.messages[index];
  if (!message) return;
  navigator.clipboard?.writeText(message.content || "").then(() => flashCopy(button));
}

function handleCopy(button) {
  const block = button.closest(".code-block");
  const code = block?.querySelector("code")?.textContent || "";
  navigator.clipboard?.writeText(code).then(() => flashCopy(button));
}

function flashCopy(button) {
  const original = button.textContent;
  button.textContent = t("copied");
  setTimeout(() => (button.textContent = original), 1100);
}

/* ─── Markdown renderer (custom, sufficient for chat output) ─────────────── */

function renderMarkdown(source) {
  if (!source) return "";
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      const lang = fence[1] || "";
      const buffer = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buffer.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      out.push(renderCodeBlock(buffer.join("\n"), lang));
      continue;
    }

    // Horizontal rule
    if (/^\s*([-*_])\s*\1\s*\1[\s-*_]*$/.test(line) && line.replace(/[\s\-_*]/g, "").length === 0 && line.replace(/\s/g, "").length >= 3) {
      out.push("<hr>");
      i++;
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote (consume contiguous)
    if (/^\s*>\s?/.test(line)) {
      const buffer = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buffer.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${renderMarkdown(buffer.join("\n"))}</blockquote>`);
      continue;
    }

    // Table (GFM)
    if (
      /\|/.test(line) &&
      i + 1 < lines.length &&
      /^\s*\|?\s*:?-+:?(\s*\|\s*:?-+:?)+\s*\|?\s*$/.test(lines[i + 1])
    ) {
      const header = parseTableRow(line);
      const aligns = parseTableRow(lines[i + 1]).map((cell) => {
        const left = /^:/.test(cell);
        const right = /:$/.test(cell);
        if (left && right) return "center";
        if (right) return "right";
        if (left) return "left";
        return "";
      });
      i += 2;
      const rows = [];
      while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim() !== "") {
        rows.push(parseTableRow(lines[i]));
        i++;
      }
      out.push(renderTable(header, rows, aligns));
      continue;
    }

    // Lists (ordered / unordered, with nesting)
    if (/^\s*([*\-+]|\d+\.)\s+/.test(line)) {
      const block = [];
      while (i < lines.length && (lines[i] === "" || /^\s+/.test(lines[i]) || /^\s*([*\-+]|\d+\.)\s+/.test(lines[i]))) {
        // stop if a blank line followed by non-list line
        if (lines[i] === "" && i + 1 < lines.length && !/^\s+/.test(lines[i + 1]) && !/^\s*([*\-+]|\d+\.)\s+/.test(lines[i + 1])) {
          break;
        }
        block.push(lines[i]);
        i++;
      }
      out.push(renderList(block));
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph (gather lines until blank or block start)
    const buffer = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^```/.test(lines[i]) &&
      !/^#{1,6}\s+/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*([*\-+]|\d+\.)\s+/.test(lines[i])
    ) {
      buffer.push(lines[i]);
      i++;
    }
    out.push(`<p>${renderInline(buffer.join("\n"))}</p>`);
  }

  return out.join("\n");
}

function parseTableRow(line) {
  let trimmed = line.trim();
  if (trimmed.startsWith("|")) trimmed = trimmed.slice(1);
  if (trimmed.endsWith("|")) trimmed = trimmed.slice(0, -1);
  return trimmed.split("|").map((cell) => cell.trim());
}

function renderTable(header, rows, aligns) {
  const head = header
    .map((cell, idx) => `<th${alignAttr(aligns[idx])}>${renderInline(cell)}</th>`)
    .join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${row.map((cell, idx) => `<td${alignAttr(aligns[idx])}>${renderInline(cell)}</td>`).join("")}</tr>`
    )
    .join("");
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function alignAttr(value) {
  return value ? ` style="text-align:${value}"` : "";
}

function renderList(block) {
  // Detect indentation of first item
  const baseIndent = (block[0].match(/^(\s*)/) || ["", ""])[1].length;
  const items = [];
  let current = null;

  for (const line of block) {
    const indent = (line.match(/^(\s*)/) || ["", ""])[1].length;
    const itemMatch = line.match(/^\s*([*\-+]|\d+\.)\s+(.*)$/);

    if (itemMatch && indent === baseIndent) {
      if (current) items.push(current);
      current = {
        marker: itemMatch[1],
        content: [itemMatch[2]],
        nested: []
      };
    } else if (current) {
      // continuation or nested
      if (line.trim() === "" || indent > baseIndent) {
        current.nested.push(line);
      } else {
        current.content.push(line);
      }
    }
  }
  if (current) items.push(current);

  const ordered = /^\d+\./.test(items[0]?.marker || "");
  const tag = ordered ? "ol" : "ul";

  const html = items
    .map((item) => {
      const text = renderInline(item.content.join(" ").trim());
      const nestedSource = dedentLines(item.nested, baseIndent + 2);
      const nestedHtml = nestedSource.trim() ? renderMarkdown(nestedSource) : "";
      return `<li>${text}${nestedHtml}</li>`;
    })
    .join("");

  return `<${tag}>${html}</${tag}>`;
}

function dedentLines(lines, count) {
  return lines.map((line) => line.replace(new RegExp(`^\\s{0,${count}}`), "")).join("\n");
}

function renderCodeBlock(code, lang) {
  const safe = escapeHtml(code);
  const langLabel = lang ? escapeHtml(lang) : "code";
  return `
    <div class="code-block">
      <div class="code-head">
        <span class="code-lang">${langLabel}</span>
        <button class="code-copy" type="button" data-copy>${escapeHtml(t("copy"))}</button>
      </div>
      <pre><code class="lang-${escapeHtml(lang)}">${safe}</code></pre>
    </div>
  `;
}

function renderInline(text) {
  if (!text) return "";
  // Escape first, then re-introduce inline markup safely.
  let value = escapeHtml(text);

  // Inline code: `code` (handle first to protect contents)
  const codeStash = [];
  value = value.replace(/`([^`\n]+)`/g, (_, code) => {
    codeStash.push(code);
    return ` CODE${codeStash.length - 1} `;
  });

  // Images: ![alt](url)
  value = value.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, alt, url) =>
    `<img src="${url}" alt="${alt}" loading="lazy" />`);

  // Links: [text](url)
  value = value.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (_, label, url) =>
    `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`);

  // Bold ** **
  value = value.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  // Italic * * (avoid matching inside words/numbers)
  value = value.replace(/(^|[^\w*])\*([^*\n]+)\*(?=[^\w*]|$)/g, "$1<em>$2</em>");
  // Strikethrough
  value = value.replace(/~~([^~\n]+)~~/g, "<del>$1</del>");

  // Restore inline code
  value = value.replace(/ CODE(\d+) /g, (_, idx) => `<code>${escapeHtml(codeStash[Number(idx)])}</code>`);

  // Newlines inside paragraphs
  value = value.replace(/\n/g, "<br>");

  return value;
}

/* ─── Utilities ──────────────────────────────────────────────────────────── */

function clearChat() {
  if (state.busy) stopStream();
  state.messages = [];
  state.currentRecordId = null;
  state.attachments = [];
  renderAttachments();
  renderMessages();
  renderRecords();
  setRunState("ready", t("ready"));
  elements.promptInput.focus();
}

function stopStream() {
  if (state.abortController) state.abortController.abort();
}

async function dryRunBenchmark() {
  try {
    const response = await fetch("/api/benchmarks/run", { method: "POST" });
    const data = await response.json();
    setRunState("ready", data.message || t("benchmarkQueued"));
    switchView("benchmarks");
  } catch (error) {
    setRunState("error", `${t("benchmarkFailed")}: ${error.message}`);
  }
}

function setBusy(value) {
  state.busy = value;
  elements.sendButton.disabled = value;
  elements.stopStream.disabled = !value;
  elements.composer = elements.composer || document.querySelector(".composer-shell");
  document.querySelector(".composer-shell")?.classList.toggle("is-streaming", value);
}

function setRunState(state_, label) {
  if (!elements.runStatus) return;
  elements.runStatus.dataset.state = state_;
  elements.runStatusLabel.textContent = label;
}

function setModelStatus(value, isError) {
  elements.modelStatus.textContent = value || "";
  elements.modelStatus.classList.toggle("is-error", Boolean(isError));
}

function modelStatusForProvider() {
  if (!elements.apiKeyInput.value.trim() && state.activeProvider?.id !== "openrouter") {
    return t("modelRefreshNeedKey");
  }
  return t("modelRefreshReady");
}

function syncSliderLabels() {
  elements.temperatureValue.value = elements.temperatureInput.value;
  elements.topPValue.value = elements.topPInput.value;
}

function syncUnlimitedControls() {
  const controls = [
    [elements.maxTokensInput, elements.maxTokensUnlimited],
    [elements.thinkingBudgetInput, elements.thinkingBudgetUnlimited]
  ];
  controls.forEach(([input, checkbox]) => {
    const unlimited = checkbox.checked;
    input.disabled = unlimited;
    input.placeholder = unlimited ? t("unlimited") : "";
    if (unlimited) input.value = "";
  });
}

function optionalNumberValue(input, unlimitedCheckbox) {
  if (unlimitedCheckbox.checked) return null;
  const raw = input.value.trim();
  return raw ? Number(raw) : null;
}

function toggleApiKeyReveal() {
  const isPassword = elements.apiKeyInput.type === "password";
  elements.apiKeyInput.type = isPassword ? "text" : "password";
  elements.apiKeyToggle.classList.toggle("is-revealed", isPassword);
}

function updateSessionMeta() {
  if (!elements.sessionMeta) return;
  const provider = state.activeProvider;
  const model = elements.modelInput.value.trim();
  if (!provider) {
    elements.sessionMeta.textContent = "";
    return;
  }
  elements.sessionMeta.innerHTML = `${escapeHtml(provider.name.toLowerCase())} <b>·</b> ${escapeHtml(model || "—")}`;
}

function markActiveProvider() {
  document.querySelectorAll(".provider-pill").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.provider === state.activeProvider?.id);
  });
}

function normalizeModelOptions(models) {
  return (models || [])
    .map((model) => {
      if (typeof model === "string") return { id: model, name: model };
      return {
        id: String(model.id || model.name || "").trim(),
        name: String(model.name || model.displayName || model.id || "").trim(),
        owner: model.owner,
        created: model.created
      };
    })
    .filter((model) => model.id);
}

function modelRefreshCounts(data, modelCount) {
  const live = data.liveModelCount ?? data.liveModels?.length ?? modelCount;
  const total = data.mergedModelCount ?? modelCount;
  const added = data.newModelCount ?? 0;
  return t("modelRefreshCounts").replace("{live}", live).replace("{total}", total).replace("{added}", added);
}

function capabilityLabel(provider) {
  if (provider.capabilities?.includes("gateway")) return "gateway";
  if (provider.capabilities?.includes("multimodal")) return "multimodal";
  if (provider.capabilities?.includes("thinking")) return "thinking";
  return provider.adapter.replace("-compatible", "");
}

function providerInitials(provider) {
  return PROVIDER_INITIALS[provider.id] || provider.name.slice(0, 3).toUpperCase();
}

function formatErrorPayload(payload) {
  if (!payload) return "";
  const details = typeof payload.details === "string" ? payload.details : JSON.stringify(payload.details || {});
  return [payload.error, payload.status ? `status ${payload.status}` : "", details]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 900);
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function t(key) {
  return translations[state.language]?.[key] || translations.en[key] || key;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
