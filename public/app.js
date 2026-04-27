const elements = {
  authScreen: document.querySelector("#authScreen"),
  appShell: document.querySelector("#appShell"),
  loginForm: document.querySelector("#loginForm"),
  loginUserInput: document.querySelector("#loginUserInput"),
  loginError: document.querySelector("#loginError"),
  providerSelect: document.querySelector("#providerSelect"),
  modelInput: document.querySelector("#modelInput"),
  modelOptions: document.querySelector("#modelOptions"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  baseUrlInput: document.querySelector("#baseUrlInput"),
  refreshModels: document.querySelector("#refreshModels"),
  modelStatus: document.querySelector("#modelStatus"),
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
  attachmentInput: document.querySelector("#attachmentInput"),
  attachmentTray: document.querySelector("#attachmentTray"),
  sendButton: document.querySelector("#sendButton"),
  stopStream: document.querySelector("#stopStream"),
  saveRecord: document.querySelector("#saveRecord"),
  clearChat: document.querySelector("#clearChat"),
  runStatus: document.querySelector("#runStatus"),
  sessionTitle: document.querySelector("#sessionTitle"),
  dryRunBenchmark: document.querySelector("#dryRunBenchmark"),
  languageToggle: document.querySelector("#languageToggle"),
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
    brandSubtitle: "LLM Gateway Lab",
    navChat: "Playground",
    navBenchmark: "Benchmark",
    navProviders: "Providers",
    history: "History",
    providerRail: "Providers",
    chatEyebrow: "Playground",
    clear: "Clear",
    save: "Save",
    saved: "Saved",
    saveFailed: "Save failed",
    stop: "Stop",
    logout: "Logout",
    loginTitle: "Sign in",
    loginUser: "User",
    loginAction: "Continue",
    loginFailed: "Sign in failed",
    recordsEmpty: "No saved records",
    deleteRecord: "Delete",
    attach: "Attach",
    attachments: "Attachments",
    removeAttachment: "Remove",
    unsupportedFile: "Only images and text files are supported for local upload",
    fileTooLarge: "File is too large",
    send: "Send",
    benchmarkEyebrow: "Evaluation",
    benchmarkTitle: "Benchmark Framework",
    dryRun: "Dry run",
    registryEyebrow: "Registry",
    providerTitle: "Provider Matrix",
    runtime: "Runtime",
    modelSettings: "Run settings",
    provider: "Provider",
    model: "Model",
    refreshModels: "Refresh",
    endpoint: "Endpoint",
    temperature: "Temperature",
    maxTokens: "Max tokens",
    thinkBudget: "Think budget",
    showReasoning: "Show reasoning stream",
    systemPrompt: "System instructions",
    providerDocs: "Provider docs",
    ready: "Ready",
    connecting: "Connecting",
    stopped: "Stopped",
    error: "Error",
    done: "Done",
    promptEmpty: "Prompt is empty",
    apiKeyRequired: "API key is required",
    loadFailed: "Load failed",
    modelRefreshIdle: "Using bundled model list",
    modelRefreshNeedKey: "Add an API key, then refresh latest models",
    modelRefreshReady: "Refresh to load the latest supported models",
    modelRefreshing: "Refreshing models",
    modelRefreshDone: "Live model list loaded",
    modelRefreshError: "Model refresh failed",
    fallbackApplied: "Fallback models are still selectable",
    promptPlaceholder: "Message the selected model",
    systemPlaceholder: "You are a helpful assistant.",
    emptyTitle: "Explore models",
    emptyBody: "Select a provider, choose a model, and start testing from the prompt box below.",
    you: "You",
    modelRole: "Model",
    reasoning: "Reasoning",
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
    brandSubtitle: "大模型 API 工作台",
    navChat: "Playground",
    navBenchmark: "评测",
    navProviders: "厂商",
    history: "历史记录",
    providerRail: "模型厂商",
    chatEyebrow: "Playground",
    clear: "清空",
    save: "保存",
    saved: "已保存",
    saveFailed: "保存失败",
    stop: "停止",
    logout: "退出",
    loginTitle: "登录",
    loginUser: "用户",
    loginAction: "继续",
    loginFailed: "登录失败",
    recordsEmpty: "暂无保存记录",
    deleteRecord: "删除",
    attach: "上传",
    attachments: "附件",
    removeAttachment: "移除",
    unsupportedFile: "本地上传暂时只支持图片和文本文件",
    fileTooLarge: "文件过大",
    send: "发送",
    benchmarkEyebrow: "评测",
    benchmarkTitle: "Benchmark 框架",
    dryRun: "试运行",
    registryEyebrow: "注册表",
    providerTitle: "厂商矩阵",
    runtime: "运行时",
    modelSettings: "Run settings",
    provider: "厂商",
    model: "模型",
    refreshModels: "刷新",
    endpoint: "接口地址",
    temperature: "温度",
    maxTokens: "最大 tokens",
    thinkBudget: "思考预算",
    showReasoning: "展示思考流",
    systemPrompt: "System instructions",
    providerDocs: "厂商文档",
    ready: "就绪",
    connecting: "连接中",
    stopped: "已停止",
    error: "错误",
    done: "完成",
    promptEmpty: "请输入消息",
    apiKeyRequired: "需要 API Key",
    loadFailed: "加载失败",
    modelRefreshIdle: "正在使用内置模型列表",
    modelRefreshNeedKey: "填入 API Key 后可刷新最新模型",
    modelRefreshReady: "点击刷新加载最新支持模型",
    modelRefreshing: "正在刷新模型",
    modelRefreshDone: "已加载实时模型列表",
    modelRefreshError: "模型刷新失败",
    fallbackApplied: "仍可使用内置模型列表",
    promptPlaceholder: "向选中的模型发送消息",
    systemPlaceholder: "You are a helpful assistant.",
    emptyTitle: "Explore models",
    emptyBody: "选择厂商和模型，然后从下方输入框开始测试。",
    you: "你",
    modelRole: "模型",
    reasoning: "思考过程",
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

const state = {
  language: localStorage.getItem("apiStudioLanguage") || "zh",
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
  modelRefreshSignatures: {}
};

init();

async function init() {
  bindEvents();
  applyLanguage();
  renderMessages();
  const session = await fetchSession();
  if (!session.authenticated) {
    showLogin();
    return;
  }
  state.user = session.user;
  showApp();
  await loadAppData();
}

async function fetchSession() {
  try {
    const response = await fetch("/api/session");
    return await response.json();
  } catch {
    return { authenticated: false };
  }
}

async function loadAppData() {
  try {
    const [providerResponse, recordResponse] = await Promise.all([
      fetch("/api/providers"),
      fetch("/api/records")
    ]);
    if (providerResponse.status === 401 || recordResponse.status === 401) {
      showLogin();
      return;
    }
    const data = await providerResponse.json();
    const recordData = await recordResponse.json();
    state.providers = data.providers || [];
    state.benchmarks = data.benchmarks || [];
    state.records = recordData.records || [];
    state.providers.forEach((provider) => {
      state.modelLists[provider.id] = normalizeModelOptions(provider.models);
    });
    renderProviders();
    renderBenchmarks();
    renderRecords();
    setProvider(state.providers[0]?.id);
    setStatus(t("ready"));
  } catch (error) {
    setStatus(`${t("loadFailed")}: ${error.message}`);
  }
}

function showLogin() {
  elements.authScreen.classList.remove("is-hidden");
  elements.appShell.classList.add("is-hidden");
  elements.loginUserInput.focus();
}

function showApp() {
  elements.authScreen.classList.add("is-hidden");
  elements.appShell.classList.remove("is-hidden");
  elements.userBadge.textContent = state.user;
}

function bindEvents() {
  elements.loginForm.addEventListener("submit", login);
  elements.providerSelect.addEventListener("change", () => setProvider(elements.providerSelect.value));
  elements.modelInput.addEventListener("input", updateSessionTitle);
  elements.refreshModels.addEventListener("click", () => refreshModels({ force: true }));
  elements.apiKeyInput.addEventListener("input", () => {
    if (elements.apiKeyInput.value.trim()) {
      setModelStatus(t("modelRefreshReady"), false);
    }
    scheduleModelRefresh();
  });
  elements.apiKeyInput.addEventListener("change", scheduleModelRefresh);
  elements.baseUrlInput.addEventListener("change", scheduleModelRefresh);
  elements.temperatureInput.addEventListener("input", syncSliderLabels);
  elements.topPInput.addEventListener("input", syncSliderLabels);
  elements.attachmentInput.addEventListener("change", handleAttachmentFiles);
  elements.chatForm.addEventListener("submit", submitChat);
  elements.stopStream.addEventListener("click", stopStream);
  elements.saveRecord.addEventListener("click", () => saveCurrentRecord(false));
  elements.clearChat.addEventListener("click", clearChat);
  elements.dryRunBenchmark.addEventListener("click", dryRunBenchmark);
  elements.languageToggle.addEventListener("click", toggleLanguage);
  elements.logoutButton.addEventListener("click", logout);
  elements.attachmentTray.addEventListener("click", (event) => {
    const removeAttachmentButton = event.target.closest("[data-remove-attachment]");
    if (removeAttachmentButton) {
      removeAttachment(removeAttachmentButton.dataset.removeAttachment);
    }
  });
  elements.recordList.addEventListener("click", (event) => {
    const recordButton = event.target.closest("[data-record-id]");
    const deleteButton = event.target.closest("[data-delete-record]");
    if (deleteButton) {
      deleteRecord(deleteButton.dataset.deleteRecord);
      return;
    }
    if (recordButton) {
      loadRecord(recordButton.dataset.recordId);
    }
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
      elements.chatForm.requestSubmit();
    }
  });
}

async function login(event) {
  event.preventDefault();
  elements.loginError.textContent = "";
  const user = elements.loginUserInput.value.trim();
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      elements.loginError.textContent = `${t("loginFailed")}: ${data.error || response.statusText}`;
      return;
    }
    state.user = data.user;
    showApp();
    await loadAppData();
  } catch (error) {
    elements.loginError.textContent = `${t("loginFailed")}: ${error.message}`;
  }
}

async function logout() {
  await fetch("/api/logout", { method: "POST" }).catch(() => {});
  state.user = "";
  state.records = [];
  state.currentRecordId = null;
  state.messages = [];
  renderMessages();
  showLogin();
}

function applyLanguage() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  elements.languageToggle.textContent = state.language === "zh" ? "EN" : "中文";
  elements.brandSubtitle.textContent = t("brandSubtitle");
  elements.promptInput.placeholder = t("promptPlaceholder");
  elements.systemPromptInput.placeholder = t("systemPlaceholder");
  elements.sessionTitle.textContent = t("chatEyebrow");

  elements.translatable.forEach((element) => {
    const key = element.dataset.i18n;
    if (key) {
      element.textContent = t(key);
    }
  });

  elements.promptChips.forEach((button) => {
    const key = `${button.dataset.promptKey}Label`;
    button.textContent = t(key);
  });

  if (!state.busy) {
    setStatus(t("ready"));
  }
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

function renderProviders() {
  elements.providerSelect.innerHTML = state.providers
    .map((provider) => `<option value="${escapeHtml(provider.id)}">${escapeHtml(provider.name)}</option>`)
    .join("");

  elements.providerRail.innerHTML = state.providers
    .map(
      (provider) => `
        <button class="provider-pill" data-provider="${escapeHtml(provider.id)}" type="button">
          <span>${escapeHtml(provider.name)}</span>
          <small>${escapeHtml(capabilityLabel(provider))}</small>
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
    .map(
      (record) => `
        <div class="record-item ${record.id === state.currentRecordId ? "is-active" : ""}">
          <button class="record-open" type="button" data-record-id="${escapeHtml(record.id)}">
            <span>${escapeHtml(record.title || "Untitled record")}</span>
            <small>${escapeHtml(record.model || record.providerId || "")}</small>
          </button>
          <button class="record-delete" type="button" data-delete-record="${escapeHtml(record.id)}" title="${escapeHtml(t("deleteRecord"))}">×</button>
        </div>
      `
    )
    .join("");
}

async function handleAttachmentFiles(event) {
  const files = Array.from(event.target.files || []);
  for (const file of files) {
    try {
      const attachment = await readAttachment(file);
      state.attachments.push(attachment);
    } catch (error) {
      setStatus(error.message);
    }
  }
  elements.attachmentInput.value = "";
  renderAttachments();
}

function readAttachment(file) {
  const isImage = file.type.startsWith("image/");
  const isText =
    file.type.startsWith("text/") ||
    ["application/json"].includes(file.type) ||
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
    if (mode === "dataUrl") {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  });
}

function renderAttachments() {
  if (!state.attachments.length) {
    elements.attachmentTray.innerHTML = "";
    return;
  }
  elements.attachmentTray.innerHTML = state.attachments
    .map(
      (attachment) => `
        <div class="attachment-chip">
          ${attachment.kind === "image" ? `<img src="${escapeHtml(attachment.dataUrl)}" alt="" />` : `<span class="file-icon">TXT</span>`}
          <span>${escapeHtml(attachment.name)}</span>
          <button type="button" data-remove-attachment="${escapeHtml(attachment.id)}" title="${escapeHtml(t("removeAttachment"))}">×</button>
        </div>
      `
    )
    .join("");
}

function removeAttachment(attachmentId) {
  state.attachments = state.attachments.filter((attachment) => attachment.id !== attachmentId);
  renderAttachments();
}

function renderBenchmarks() {
  elements.benchmarkGrid.innerHTML = state.benchmarks
    .map(
      (benchmark) => `
        <article class="benchmark-item">
          <div class="card-kicker">${escapeHtml(benchmark.status || "planned")}</div>
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
  elements.baseUrlInput.value = provider.baseUrl;
  elements.docsLink.href = provider.docs;
  renderModelOptions(provider.id, provider.defaultModel);
  markActiveProvider();
  updateSessionTitle();
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
  if (!state.activeProvider || state.modelBusy) {
    return;
  }
  const hasApiKey = Boolean(elements.apiKeyInput.value.trim());
  if (!hasApiKey && state.activeProvider.id !== "openrouter") {
    return;
  }

  window.clearTimeout(state.modelRefreshTimer);
  state.modelRefreshTimer = window.setTimeout(() => {
    refreshModels({ silent: true });
  }, 700);
}

async function refreshModels(options = {}) {
  if (!state.activeProvider || state.modelBusy) {
    return;
  }

  const force = options.force === true;
  const silent = options.silent === true;
  const signature = [
    state.activeProvider.id,
    elements.baseUrlInput.value.trim(),
    elements.apiKeyInput.value.trim()
  ].join("|");

  if (!force && state.modelRefreshSignatures[state.activeProvider.id] === signature) {
    return;
  }
  window.clearTimeout(state.modelRefreshTimer);

  state.modelBusy = true;
  elements.refreshModels.disabled = true;
  if (!silent) {
    setModelStatus(`${t("modelRefreshing")}...`, false);
  }

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
    updateSessionTitle();
    setModelStatus(`${t("modelRefreshDone")} · ${state.modelLists[state.activeProvider.id].length}`, false);
  } catch (error) {
    setModelStatus(`${t("modelRefreshError")}: ${error.message}`, true);
  } finally {
    state.modelBusy = false;
    elements.refreshModels.disabled = false;
  }
}

async function saveCurrentRecord(quiet) {
  if (!state.messages.length) {
    setStatus(t("promptEmpty"));
    return;
  }
  try {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildRecordPayload())
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || response.statusText);
    }
    state.currentRecordId = data.record.id;
    const index = state.records.findIndex((record) => record.id === data.record.id);
    if (index >= 0) {
      state.records[index] = data.record;
    } else {
      state.records.unshift(data.record);
    }
    state.records.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
    renderRecords();
    if (!quiet) {
      setStatus(t("saved"));
    }
  } catch (error) {
    setStatus(`${t("saveFailed")}: ${error.message}`);
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
    parameters: {
      temperature: Number(elements.temperatureInput.value),
      topP: Number(elements.topPInput.value),
      maxTokens: Number(elements.maxTokensInput.value),
      thinkingBudget: Number(elements.thinkingBudgetInput.value),
      thinkingEnabled: elements.thinkingToggle.checked
    },
    messages: state.messages
  };
}

function titleFromMessages() {
  const firstUserMessage = state.messages.find((message) => message.role === "user" && message.content);
  return (firstUserMessage?.content || "Untitled record").replace(/\s+/g, " ").slice(0, 72);
}

function loadRecord(recordId) {
  const record = state.records.find((item) => item.id === recordId);
  if (!record) {
    return;
  }
  state.currentRecordId = record.id;
  if (record.providerId) {
    setProvider(record.providerId);
  }
  if (record.model) {
    renderModelOptions(record.providerId || elements.providerSelect.value, record.model);
  }
  elements.baseUrlInput.value = record.baseUrl || elements.baseUrlInput.value;
  elements.systemPromptInput.value = record.systemPrompt || "";
  applyRecordParameters(record.parameters || {});
  state.messages = Array.isArray(record.messages) ? record.messages : [];
  renderMessages();
  renderRecords();
  switchView("chat");
  setStatus(t("ready"));
}

function applyRecordParameters(parameters) {
  if (parameters.temperature !== undefined) {
    elements.temperatureInput.value = parameters.temperature;
  }
  if (parameters.topP !== undefined) {
    elements.topPInput.value = parameters.topP;
  }
  if (parameters.maxTokens !== undefined) {
    elements.maxTokensInput.value = parameters.maxTokens;
  }
  if (parameters.thinkingBudget !== undefined) {
    elements.thinkingBudgetInput.value = parameters.thinkingBudget;
  }
  elements.thinkingToggle.checked = Boolean(parameters.thinkingEnabled);
  syncSliderLabels();
}

async function deleteRecord(recordId) {
  try {
    const response = await fetch(`/api/records/${encodeURIComponent(recordId)}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || response.statusText);
    }
    state.records = state.records.filter((record) => record.id !== recordId);
    if (state.currentRecordId === recordId) {
      state.currentRecordId = null;
    }
    renderRecords();
  } catch (error) {
    setStatus(`${t("saveFailed")}: ${error.message}`);
  }
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
  if (!prompt && !state.attachments.length) {
    setStatus(t("promptEmpty"));
    return;
  }

  if (!elements.apiKeyInput.value.trim()) {
    setStatus(t("apiKeyRequired"));
    elements.apiKeyInput.focus();
    return;
  }

  const userMessage = { role: "user", content: prompt, attachments: state.attachments };
  const assistantMessage = { role: "assistant", content: "", reasoning: "", usage: null };
  state.messages.push(userMessage, assistantMessage);
  elements.promptInput.value = "";
  state.attachments = [];
  renderAttachments();
  renderMessages();
  setBusy(true);
  setStatus(t("connecting"));

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
      throw new Error(formatErrorPayload(error) || "Request failed");
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
        assistantMessage.content += `\n\n[${t("error")}] ${data.message || "Request failed"}`;
        if (data.details) {
          assistantMessage.content += `\n${typeof data.details === "string" ? data.details : JSON.stringify(data.details, null, 2)}`;
        }
        renderMessages();
        setStatus(t("error"));
      }
      if (eventName === "done") {
        setStatus(`${t("done")} · ${data.totalMs}ms`);
        if (state.currentRecordId) {
          saveCurrentRecord(true);
        }
      }
    });
  } catch (error) {
    if (error.name !== "AbortError") {
      assistantMessage.content += `\n\n[${t("error")}] ${error.message}`;
      renderMessages();
      setStatus(t("error"));
    } else {
      setStatus(t("stopped"));
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
        <div class="empty-card">
          <strong>${escapeHtml(t("emptyTitle"))}</strong>
          <span>${escapeHtml(t("emptyBody"))}</span>
        </div>
      </div>
    `;
    return;
  }

  elements.messageList.innerHTML = state.messages
    .map(
      (message) => `
        <article class="message ${escapeHtml(message.role)}">
          <div class="message-role">${message.role === "user" ? t("you") : t("modelRole")}</div>
          <div class="message-body">
            ${renderReasoning(message)}
            ${renderMessageAttachments(message)}
            <div class="message-content">${renderMarkdown(message.content || "")}</div>
            ${message.usage ? `<div class="usage-line">${escapeHtml(formatUsage(message.usage))}</div>` : ""}
          </div>
        </article>
      `
    )
    .join("");
  elements.messageList.scrollTop = elements.messageList.scrollHeight;
}

function renderMessageAttachments(message) {
  if (!message.attachments?.length) {
    return "";
  }
  return `
    <div class="message-attachments">
      ${message.attachments
        .map((attachment) =>
          attachment.kind === "image"
            ? `<img src="${escapeHtml(attachment.dataUrl)}" alt="${escapeHtml(attachment.name)}" />`
            : `<span>${escapeHtml(attachment.name)}</span>`
        )
        .join("")}
    </div>
  `;
}

function renderReasoning(message) {
  if (!message.reasoning) {
    return "";
  }

  return `
    <details class="reasoning-block" open>
      <summary>${escapeHtml(t("reasoning"))}</summary>
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
  state.currentRecordId = null;
  renderMessages();
  renderRecords();
  setStatus(t("ready"));
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
    setStatus(data.message || t("benchmarkQueued"));
    switchView("benchmarks");
  } catch (error) {
    setStatus(`${t("benchmarkFailed")}: ${error.message}`);
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

function updateSessionTitle() {
  elements.sessionTitle.textContent = t("chatEyebrow");
}

function markActiveProvider() {
  document.querySelectorAll(".provider-pill").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.provider === state.activeProvider.id);
  });
}

function normalizeModelOptions(models) {
  return (models || [])
    .map((model) => {
      if (typeof model === "string") {
        return { id: model, name: model };
      }
      return {
        id: String(model.id || model.name || "").trim(),
        name: String(model.name || model.displayName || model.id || "").trim(),
        owner: model.owner,
        created: model.created
      };
    })
    .filter((model) => model.id);
}

function capabilityLabel(provider) {
  if (provider.capabilities?.includes("gateway")) {
    return "gateway";
  }
  if (provider.capabilities?.includes("multimodal")) {
    return "multimodal";
  }
  if (provider.capabilities?.includes("thinking")) {
    return "reasoning";
  }
  return provider.adapter.replace("-compatible", "");
}

function formatErrorPayload(payload) {
  if (!payload) {
    return "";
  }
  const details = typeof payload.details === "string" ? payload.details : JSON.stringify(payload.details || {});
  return [payload.error, payload.status ? `status ${payload.status}` : "", details]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 900);
}

function t(key) {
  return translations[state.language]?.[key] || translations.en[key] || key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
