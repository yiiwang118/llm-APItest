export const providers = [
  {
    id: "openai",
    name: "OpenAI",
    adapter: "openai-compatible",
    baseUrl: "https://api.openai.com/v1",
    defaultModel: "gpt-5.2",
    models: ["gpt-5.2", "gpt-5.1", "gpt-4.1", "gpt-4.1-mini", "o4-mini"],
    docs: "https://platform.openai.com/docs/api-reference/chat/create-chat-completion",
    capabilities: ["stream", "text", "tools"]
  },
  {
    id: "anthropic",
    name: "Anthropic",
    adapter: "anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    defaultModel: "claude-sonnet-4-5",
    models: ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5"],
    docs: "https://docs.anthropic.com/claude/reference/messages-streaming",
    capabilities: ["stream", "text", "thinking"]
  },
  {
    id: "google",
    name: "Google Gemini",
    adapter: "gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    defaultModel: "gemini-2.5-pro",
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
    docs: "https://ai.google.dev/docs/gemini_api_overview",
    capabilities: ["stream", "text", "multimodal"]
  },
  {
    id: "zhipu",
    name: "Zhipu GLM",
    adapter: "openai-compatible",
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    defaultModel: "glm-4.7",
    models: ["glm-4.7", "glm-4.6", "glm-4.5", "glm-4.5v", "glm-z1-air"],
    docs: "https://docs.bigmodel.cn/api-reference",
    thinkingMode: "thinking-object",
    capabilities: ["stream", "text", "thinking", "multimodal"]
  },
  {
    id: "qwen",
    name: "Qwen / DashScope",
    adapter: "openai-compatible",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    defaultModel: "qwen-plus",
    models: ["qwen3-max", "qwen-plus", "qwen-flash", "qwen3-235b-a22b-thinking-2507", "qwen-vl-max-latest"],
    docs: "https://help.aliyun.com/zh/model-studio/qwen-api-via-openai-chat-completions",
    thinkingMode: "enable-thinking",
    capabilities: ["stream", "text", "thinking", "multimodal"]
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    adapter: "openai-compatible",
    baseUrl: "https://api.deepseek.com",
    defaultModel: "deepseek-v4-flash",
    models: ["deepseek-v4-flash", "deepseek-v4-pro", "deepseek-chat", "deepseek-reasoner"],
    docs: "https://api-docs.deepseek.com/api/create-chat-completion",
    thinkingMode: "thinking-object",
    capabilities: ["stream", "text", "thinking"]
  },
  {
    id: "xiaomi",
    name: "Xiaomi MiMo",
    adapter: "openai-compatible",
    baseUrl: "https://api.xiaomimimo.com/v1",
    defaultModel: "mimo-v2-flash",
    models: ["mimo-v2-flash", "mimo-v2-pro", "mimo-v2-omni"],
    docs: "https://www.xiaomi-mimo-ai.com/",
    thinkingMode: "thinking-object",
    capabilities: ["stream", "text", "thinking", "multimodal"]
  },
  {
    id: "minimax",
    name: "MiniMax",
    adapter: "openai-compatible",
    baseUrl: "https://api.minimax.io/v1",
    defaultModel: "MiniMax-M2.5",
    models: ["MiniMax-M2.7", "MiniMax-M2.7-highspeed", "MiniMax-M2.5", "MiniMax-M2.1", "MiniMax-M2"],
    docs: "https://platform.minimax.io/docs/api-reference/text-chat",
    capabilities: ["stream", "text", "thinking"]
  },
  {
    id: "siliconflow",
    name: "SiliconFlow",
    adapter: "openai-compatible",
    baseUrl: "https://api.siliconflow.com/v1",
    defaultModel: "Qwen/Qwen3-235B-A22B-Thinking-2507",
    models: [
      "deepseek-ai/DeepSeek-V3.2",
      "deepseek-ai/DeepSeek-R1",
      "Qwen/Qwen3-235B-A22B-Thinking-2507",
      "zai-org/GLM-5.1",
      "MiniMaxAI/MiniMax-M2.5"
    ],
    docs: "https://docs.siliconflow.com/en/api-reference/chat-completions/chat-completions",
    thinkingMode: "enable-thinking",
    capabilities: ["stream", "text", "thinking", "gateway"]
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    adapter: "openai-compatible",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openai/gpt-5.2",
    models: ["openai/gpt-5.2", "anthropic/claude-sonnet-4.5", "google/gemini-2.5-pro", "deepseek/deepseek-v4-flash"],
    docs: "https://openrouter.ai/docs/api-reference/chat-completion",
    extraHeaders: {
      "HTTP-Referer": "http://localhost",
      "X-Title": "LLM API Test Studio"
    },
    capabilities: ["stream", "text", "gateway"]
  }
];

export const benchmarkSuites = [
  {
    id: "latency",
    name: "Latency",
    status: "planned",
    metrics: ["first_token_ms", "total_ms", "tokens_per_second"],
    description: "Measures response speed and streaming cadence for identical prompts."
  },
  {
    id: "quality",
    name: "Quality",
    status: "planned",
    metrics: ["judge_score", "pass_rate", "format_accuracy"],
    description: "Keeps a hook for model-graded and rule-based answer quality checks."
  },
  {
    id: "reasoning",
    name: "Reasoning",
    status: "planned",
    metrics: ["pass_at_1", "reasoning_tokens", "cost_per_pass"],
    description: "Reserved for GPQA, math, coding, and long-context reasoning tasks."
  },
  {
    id: "custom",
    name: "Custom Set",
    status: "planned",
    metrics: ["dataset_score", "cost", "regression_delta"],
    description: "Provides the future extension point for user-supplied benchmark files."
  }
];

export function getProvider(providerId) {
  return providers.find((provider) => provider.id === providerId);
}

export function publicProviders() {
  return providers.map((provider) => ({
    id: provider.id,
    name: provider.name,
    adapter: provider.adapter,
    baseUrl: provider.baseUrl,
    defaultModel: provider.defaultModel,
    models: provider.models,
    docs: provider.docs,
    capabilities: provider.capabilities
  }));
}
