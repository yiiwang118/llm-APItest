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
  benchTabs: document.querySelector("#benchTabs"),
  benchPrompt: document.querySelector("#benchPrompt"),
  benchTrials: document.querySelector("#benchTrials"),
  benchMaxTokens: document.querySelector("#benchMaxTokens"),
  benchTemperature: document.querySelector("#benchTemperature"),
  benchTargets: document.querySelector("#benchTargets"),
  benchAddTarget: document.querySelector("#benchAddTarget"),
  benchAddCurrent: document.querySelector("#benchAddCurrent"),
  benchRun: document.querySelector("#benchRun"),
  benchStop: document.querySelector("#benchStop"),
  benchRunStatus: document.querySelector("#benchRunStatus"),
  benchRunStatusLabel: document.querySelector("#benchRunStatus .run-label"),
  benchResults: document.querySelector("#benchResults"),
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
    benchmarkQueued: "Benchmark dry run queued",
    benchPromptLabel: "prompt",
    benchTrials: "trials per target",
    benchMaxTokens: "max tokens",
    benchTemperature: "temperature",
    benchTargets: "targets",
    benchUseCurrent: "use current",
    benchAddTarget: "+ add target",
    benchRun: "run latency",
    benchIdle: "idle",
    benchStarting: "starting...",
    benchRunningProgress: "running · {total} trials queued",
    benchTrialRunning: "running · {label} ({trial}/{trials})",
    benchDone: "done · {ms}ms",
    benchTargetsNeeded: "Add at least one target with API key",
    benchEmptyTitle: "No runs yet",
    benchEmptyBody: "Configure targets above and hit run latency. Trials will stream in here as they complete.",
    benchColTarget: "trial",
    benchColTtft: "ttft",
    benchColTotal: "total",
    benchColTokens: "tokens",
    benchColTps: "tok/s",
    benchColStatus: "status",
    benchTrialN: "trial {n}",
    benchAvg: "avg ({n})",
    benchStatus_pending: "queued",
    benchStatus_running: "live",
    benchStatus_complete: "ok",
    benchStatus_error: "error"
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
    benchmarkQueued: "Benchmark 试运行已排队",
    benchPromptLabel: "提示词",
    benchTrials: "每目标试次",
    benchMaxTokens: "最大 tokens",
    benchTemperature: "温度",
    benchTargets: "目标",
    benchUseCurrent: "用当前配置",
    benchAddTarget: "+ 添加目标",
    benchRun: "开跑",
    benchIdle: "空闲",
    benchStarting: "启动中...",
    benchRunningProgress: "运行中 · {total} 个试次排队",
    benchTrialRunning: "运行中 · {label} ({trial}/{trials})",
    benchDone: "完成 · {ms}ms",
    benchTargetsNeeded: "至少需要一个填好 API Key 的目标",
    benchEmptyTitle: "还没有结果",
    benchEmptyBody: "在上方配置好目标并点击开跑，试次结果会实时回流到这里。",
    benchColTarget: "试次",
    benchColTtft: "首 token",
    benchColTotal: "总耗时",
    benchColTokens: "输出 tokens",
    benchColTps: "tok/s",
    benchColStatus: "状态",
    benchTrialN: "trial {n}",
    benchAvg: "均值 ({n})",
    benchStatus_pending: "排队",
    benchStatus_running: "运行",
    benchStatus_complete: "成功",
    benchStatus_error: "失败"
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
  apiKeys: {},
  benchmark: {
    targets: [],
    trialsByTarget: {},
    running: false,
    abortController: null,
    summary: null
  }
};

init();

async function init() {
  window.addEventListener("error", (event) => {
    console.error("[uncaught]", event.error || event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    console.error("[promise]", event.reason);
  });
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
    initBenchmark();
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
  elements.languageToggle.addEventListener("click", toggleLanguage);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.logoutButton.addEventListener("click", logout);

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-bench-action]");
    if (!action) return;
    try {
      switch (action.dataset.benchAction) {
        case "add-target": addBenchTarget(); break;
        case "add-current": addBenchTarget(currentTargetSeed()); break;
        case "run": runLatencyBench(); break;
        case "stop": stopLatencyBench(); break;
      }
    } catch (err) {
      console.error("[bench] action failed", action.dataset.benchAction, err);
      setBenchStatus("error", err?.message || "action failed");
    }
  });
  elements.benchTargets?.addEventListener("click", (event) => {
    const removeBtn = event.target.closest("[data-bench-remove]");
    if (removeBtn) removeBenchTarget(removeBtn.dataset.benchRemove);
    const reveal = event.target.closest("[data-bench-reveal]");
    if (reveal) toggleBenchKeyReveal(reveal);
  });
  elements.benchTargets?.addEventListener("input", handleBenchTargetEdit);
  elements.benchTargets?.addEventListener("change", handleBenchTargetEdit);

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
  renderBenchTargets();
  renderBenchResults();
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
      id: uuid(),
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
      id: uuid(),
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

/* ─── Benchmarks (latency) ───────────────────────────────────────────────── */

function initBenchmark() {
  if (!state.benchmark.targets.length && state.providers.length) {
    addBenchTarget(currentTargetSeed());
  } else {
    renderBenchTargets();
  }
  renderBenchResults();
}

function currentTargetSeed() {
  const provider = state.activeProvider || state.providers[0];
  if (!provider) return null;
  const apiKey =
    state.apiKeys[provider.id] ||
    (state.activeProvider?.id === provider.id ? elements.apiKeyInput.value.trim() : "");
  return {
    providerId: provider.id,
    model: provider.id === state.activeProvider?.id
      ? elements.modelInput.value.trim() || provider.defaultModel
      : provider.defaultModel,
    apiKey
  };
}

function addBenchTarget(seed) {
  const provider = state.providers.find((p) => p.id === seed?.providerId) || state.providers[0];
  if (!provider) return;
  const target = {
    id: uuid(),
    providerId: provider.id,
    model: seed?.model || provider.defaultModel,
    apiKey: seed?.apiKey || state.apiKeys[provider.id] || "",
    revealed: false
  };
  state.benchmark.targets.push(target);
  renderBenchTargets();
}

function removeBenchTarget(id) {
  state.benchmark.targets = state.benchmark.targets.filter((target) => target.id !== id);
  delete state.benchmark.trialsByTarget[id];
  renderBenchTargets();
  renderBenchResults();
}

function toggleBenchKeyReveal(button) {
  const id = button.dataset.benchReveal;
  const target = state.benchmark.targets.find((item) => item.id === id);
  if (!target) return;
  target.revealed = !target.revealed;
  renderBenchTargets();
}

function handleBenchTargetEdit(event) {
  const row = event.target.closest("[data-bench-target]");
  if (!row) return;
  const id = row.dataset.benchTarget;
  const target = state.benchmark.targets.find((item) => item.id === id);
  if (!target) return;
  const field = event.target.dataset.benchField;
  if (!field) return;
  if (field === "providerId") {
    target.providerId = event.target.value;
    const provider = state.providers.find((p) => p.id === target.providerId);
    if (provider) target.model = provider.defaultModel;
    target.apiKey = state.apiKeys[target.providerId] || "";
    renderBenchTargets();
    return;
  }
  if (field === "model") {
    target.model = event.target.value;
  }
  if (field === "apiKey") {
    target.apiKey = event.target.value;
    state.apiKeys[target.providerId] = event.target.value;
  }
}

function renderBenchTargets() {
  if (!elements.benchTargets) return;
  elements.benchTargets.innerHTML = state.benchmark.targets
    .map((target, index) => {
      const provider = state.providers.find((p) => p.id === target.providerId);
      const models = state.modelLists[target.providerId] || normalizeModelOptions(provider?.models || []);
      const datalistId = `bench-models-${target.id}`;
      const providerOptions = state.providers
        .map(
          (p) =>
            `<option value="${escapeHtml(p.id)}" ${p.id === target.providerId ? "selected" : ""}>${escapeHtml(p.name)}</option>`
        )
        .join("");
      const modelOptions = models
        .map((model) => `<option value="${escapeHtml(model.id)}"></option>`)
        .join("");
      return `
        <div class="bench-target" data-bench-target="${escapeHtml(target.id)}">
          <span class="bench-target-index">${index + 1}</span>
          <select data-bench-field="providerId" aria-label="Provider">${providerOptions}</select>
          <input type="text" data-bench-field="model" list="${datalistId}" value="${escapeHtml(target.model || "")}" placeholder="${escapeHtml(provider?.defaultModel || "model")}" />
          <datalist id="${datalistId}">${modelOptions}</datalist>
          <div class="input-wrap">
            <input type="${target.revealed ? "text" : "password"}" data-bench-field="apiKey" value="${escapeHtml(target.apiKey || "")}" placeholder="api key" autocomplete="off" />
            <button type="button" class="input-affix${target.revealed ? " is-revealed" : ""}" data-bench-reveal="${escapeHtml(target.id)}" title="Reveal">
              <svg class="affix-icon eye" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="affix-icon eye-off" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.6A2 2 0 0 0 13.4 13.4"/><path d="M9.9 5.2A11 11 0 0 1 12 5C19 5 22 12 22 12C21.4 13.4 20.5 14.7 19.4 15.8M6.6 6.6C3.9 8.4 2 12 2 12C2 12 5 19 12 19A11 11 0 0 0 17.4 17.4"/></svg>
            </button>
          </div>
          <button type="button" class="bench-target-remove" data-bench-remove="${escapeHtml(target.id)}" title="Remove">×</button>
        </div>
      `;
    })
    .join("");
}

async function runLatencyBench() {
  if (state.benchmark.running) return;
  const targets = state.benchmark.targets
    .filter((target) => target.providerId && target.model && (target.apiKey || target.providerId === "openrouter"))
    .map((target) => ({
      id: target.id,
      providerId: target.providerId,
      model: target.model.trim(),
      apiKey: target.apiKey.trim()
    }));

  if (!targets.length) {
    setBenchStatus("error", t("benchTargetsNeeded"));
    return;
  }

  const trials = clamp(parseInt(elements.benchTrials.value, 10) || 3, 1, 10);
  const maxTokens = clamp(parseInt(elements.benchMaxTokens.value, 10) || 256, 32, 4096);
  const temperature = clamp(parseFloat(elements.benchTemperature.value) || 0.3, 0, 2);
  const prompt = elements.benchPrompt.value.trim() || "Reply with a single haiku about an octopus exploring the deep sea.";

  state.benchmark.trialsByTarget = {};
  state.benchmark.targets.forEach((target) => {
    state.benchmark.trialsByTarget[target.id] = Array.from({ length: trials }, (_, idx) => ({
      trial: idx + 1,
      status: "pending"
    }));
  });
  state.benchmark.summary = null;
  state.benchmark.running = true;
  state.benchmark.abortController = new AbortController();
  elements.benchRun.disabled = true;
  elements.benchStop.disabled = false;
  setBenchStatus("running", t("benchStarting"));
  renderBenchResults();

  try {
    const response = await fetch("/api/benchmarks/latency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targets,
        prompt,
        trials,
        parameters: { temperature, maxTokens, topP: 0.9, thinkingEnabled: false }
      }),
      signal: state.benchmark.abortController.signal
    });
    if (!response.ok || !response.body) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(formatErrorPayload(error) || "Request failed");
    }
    await readEventStream(response.body, handleBenchEvent);
  } catch (error) {
    if (error.name !== "AbortError") {
      setBenchStatus("error", `${t("error")}: ${error.message}`);
    } else {
      setBenchStatus("idle", t("stopped"));
    }
  } finally {
    state.benchmark.running = false;
    state.benchmark.abortController = null;
    elements.benchRun.disabled = false;
    elements.benchStop.disabled = true;
    renderBenchResults();
  }
}

function stopLatencyBench() {
  if (state.benchmark.abortController) state.benchmark.abortController.abort();
}

function handleBenchEvent(eventName, data) {
  if (eventName === "started") {
    setBenchStatus("running", t("benchRunningProgress").replace("{total}", data.totalRuns));
    return;
  }
  if (eventName === "trial-start") {
    const trials = state.benchmark.trialsByTarget[data.targetId];
    if (!trials) return;
    const trial = trials.find((item) => item.trial === data.trial);
    if (trial) trial.status = "running";
    setBenchStatus(
      "running",
      t("benchTrialRunning").replace("{label}", data.label).replace("{trial}", data.trial).replace("{trials}", data.trials)
    );
    renderBenchResults();
    return;
  }
  if (eventName === "trial-complete") {
    const trials = state.benchmark.trialsByTarget[data.targetId];
    const trial = trials?.find((item) => item.trial === data.trial);
    if (trial) {
      trial.status = "complete";
      trial.metrics = data.metrics;
    }
    renderBenchResults();
    return;
  }
  if (eventName === "trial-error") {
    const trials = state.benchmark.trialsByTarget[data.targetId];
    const trial = trials?.find((item) => item.trial === data.trial);
    if (trial) {
      trial.status = "error";
      trial.error = data.error;
    }
    renderBenchResults();
    return;
  }
  if (eventName === "done") {
    state.benchmark.summary = data;
    setBenchStatus("idle", t("benchDone").replace("{ms}", data.totalMs));
    renderBenchResults();
  }
}

function setBenchStatus(stateName, label) {
  if (!elements.benchRunStatus) return;
  const map = { idle: "ready", running: "streaming", error: "error", complete: "ready" };
  elements.benchRunStatus.dataset.state = map[stateName] || "ready";
  elements.benchRunStatusLabel.textContent = label;
}

function renderBenchResults() {
  if (!elements.benchResults) return;
  const targets = state.benchmark.targets;
  const trialsByTarget = state.benchmark.trialsByTarget;
  const hasAnyTrial = Object.values(trialsByTarget).some((arr) => arr && arr.length);

  if (!hasAnyTrial) {
    elements.benchResults.innerHTML = `
      <div class="bench-empty">
        <div class="bench-empty-card">
          <span class="bench-empty-mark">◇</span>
          <strong>${escapeHtml(t("benchEmptyTitle"))}</strong>
          <span>${escapeHtml(t("benchEmptyBody"))}</span>
        </div>
      </div>
    `;
    return;
  }

  const summaryHtml = renderBenchSummary();
  const tableHtml = renderBenchTable(targets, trialsByTarget);
  elements.benchResults.innerHTML = `${summaryHtml}<table class="bench-table">${tableHtml}</table>`;
}

function renderBenchSummary() {
  const trialsByTarget = state.benchmark.trialsByTarget;
  let total = 0;
  let done = 0;
  let errors = 0;
  const ttfts = [];
  const totals = [];
  Object.values(trialsByTarget).forEach((arr) => {
    (arr || []).forEach((trial) => {
      total += 1;
      if (trial.status === "complete") {
        done += 1;
        if (trial.metrics?.first_token_ms != null) ttfts.push(trial.metrics.first_token_ms);
        if (trial.metrics?.total_ms != null) totals.push(trial.metrics.total_ms);
      }
      if (trial.status === "error") errors += 1;
    });
  });
  const avgTtft = ttfts.length ? Math.round(avg(ttfts)) : null;
  const avgTotal = totals.length ? Math.round(avg(totals)) : null;
  return `
    <div class="bench-summary">
      <span class="pair"><span>runs</span><b>${done}/${total}</b></span>
      <span class="pair"><span>errors</span><b class="${errors ? "" : "muted"}">${errors}</b></span>
      <span class="pair"><span>avg ttft</span><b class="accent">${avgTtft != null ? `${avgTtft} ms` : "—"}</b></span>
      <span class="pair"><span>avg total</span><b class="accent">${avgTotal != null ? `${avgTotal} ms` : "—"}</b></span>
    </div>
  `;
}

function renderBenchTable(targets, trialsByTarget) {
  const head = `
    <thead><tr>
      <th>${escapeHtml(t("benchColTarget"))}</th>
      <th>${escapeHtml(t("benchColTtft"))}</th>
      <th>${escapeHtml(t("benchColTotal"))}</th>
      <th>${escapeHtml(t("benchColTokens"))}</th>
      <th>${escapeHtml(t("benchColTps"))}</th>
      <th>${escapeHtml(t("benchColStatus"))}</th>
    </tr></thead>
  `;
  const body = targets
    .map((target) => {
      const provider = state.providers.find((p) => p.id === target.providerId);
      const trials = trialsByTarget[target.id] || [];
      const label = `${provider?.name || target.providerId} · ${target.model || "default"}`;
      const initials = providerInitials(provider || { id: target.providerId, name: target.providerId });
      const headRow = `
        <tr class="target-head">
          <td colspan="6"><span class="bench-target-mark">${escapeHtml(initials)}</span>${escapeHtml(label)}</td>
        </tr>
      `;
      const trialRows = trials
        .map((trial) => {
          const status = trial.status || "pending";
          if (status === "error") {
            return `
              <tr class="trial-row">
                <td>${escapeHtml(t("benchTrialN").replace("{n}", trial.trial))}</td>
                <td colspan="4" class="bench-error-cell">${escapeHtml(trial.error || "error")}</td>
                <td><span class="bench-status" data-state="error">err</span></td>
              </tr>
            `;
          }
          const metrics = trial.metrics || {};
          return `
            <tr class="trial-row">
              <td>${escapeHtml(t("benchTrialN").replace("{n}", trial.trial))}</td>
              <td class="num">${formatMs(metrics.first_token_ms)}</td>
              <td class="num">${formatMs(metrics.total_ms)}</td>
              <td class="num">${formatTokens(metrics)}</td>
              <td class="num">${formatTps(metrics.tokens_per_second)}</td>
              <td><span class="bench-status" data-state="${status}">${escapeHtml(t(`benchStatus_${status}`))}</span></td>
            </tr>
          `;
        })
        .join("");
      const aggregate = computeAggregate(trials);
      const aggRow = aggregate.count
        ? `
          <tr class="aggregate-row">
            <td>${escapeHtml(t("benchAvg")).replace("{n}", aggregate.count)}</td>
            <td class="num">${formatMs(aggregate.avgTtft)}<span class="muted"> · ${formatMs(aggregate.minTtft)}–${formatMs(aggregate.maxTtft)}</span></td>
            <td class="num">${formatMs(aggregate.avgTotal)}<span class="muted"> · ${formatMs(aggregate.minTotal)}–${formatMs(aggregate.maxTotal)}</span></td>
            <td class="num">${formatTokens({ output_tokens: aggregate.avgTokens })}</td>
            <td class="num">${formatTps(aggregate.avgTps)}</td>
            <td></td>
          </tr>
        `
        : "";
      return headRow + trialRows + aggRow;
    })
    .join("");
  return head + `<tbody>${body}</tbody>`;
}

function computeAggregate(trials) {
  const completed = trials.filter((trial) => trial.status === "complete" && trial.metrics);
  if (!completed.length) return { count: 0 };
  const ttfts = completed.map((t) => t.metrics.first_token_ms).filter((v) => v != null);
  const totals = completed.map((t) => t.metrics.total_ms).filter((v) => v != null);
  const tokens = completed
    .map((t) => t.metrics.output_tokens ?? t.metrics.output_tokens_estimated)
    .filter((v) => v != null);
  const tps = completed.map((t) => t.metrics.tokens_per_second).filter((v) => v != null);
  return {
    count: completed.length,
    avgTtft: ttfts.length ? Math.round(avg(ttfts)) : null,
    minTtft: ttfts.length ? Math.min(...ttfts) : null,
    maxTtft: ttfts.length ? Math.max(...ttfts) : null,
    avgTotal: totals.length ? Math.round(avg(totals)) : null,
    minTotal: totals.length ? Math.min(...totals) : null,
    maxTotal: totals.length ? Math.max(...totals) : null,
    avgTokens: tokens.length ? Math.round(avg(tokens)) : null,
    avgTps: tps.length ? Math.round(avg(tps) * 10) / 10 : null
  };
}

function formatMs(value) {
  if (value == null) return `<span class="muted">—</span>`;
  return `${value} <span class="muted">ms</span>`;
}

function formatTokens(metrics) {
  const tokens = metrics.output_tokens ?? metrics.output_tokens_estimated;
  if (tokens == null) return `<span class="muted">—</span>`;
  if (metrics.output_tokens == null && metrics.output_tokens_estimated != null) {
    return `~${tokens}`;
  }
  return String(tokens);
}

function formatTps(value) {
  if (value == null) return `<span class="muted">—</span>`;
  return `${value}<span class="muted"> tok/s</span>`;
}

function avg(values) {
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
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
  clipboardWrite(message.content || "").then(() => flashCopy(button));
}

function handleCopy(button) {
  const block = button.closest(".code-block");
  const code = block?.querySelector("code")?.textContent || "";
  clipboardWrite(code).then(() => flashCopy(button));
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

function uuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {}
  }
  const rand = () => Math.random().toString(36).slice(2, 10);
  return `id-${Date.now().toString(36)}-${rand()}${rand()}`;
}

function clipboardWrite(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => clipboardFallback(text));
  }
  clipboardFallback(text);
  return Promise.resolve();
}

function clipboardFallback(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
  } catch {}
  document.body.removeChild(ta);
}
