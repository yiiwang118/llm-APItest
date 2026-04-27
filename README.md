# LLM API Test Studio

一个用于测试多厂商大模型 API 的前后端一体 Web 工作台。当前版本提供模型厂商选择、API Key 临时输入、流式输出、推理过程分栏展示，以及后续 benchmark 能力的接口和页面框架。

## 功能范围

- 支持 OpenAI、Anthropic、Google Gemini、智谱 GLM、Qwen / DashScope、DeepSeek、小米 MiMo、MiniMax、SiliconFlow、OpenRouter。
- 后端统一代理不同厂商的流式接口，前端按 `token`、`reasoning`、`usage` 标准事件渲染。
- API Key 不写入本地文件，只随当前请求发送到后端代理。
- 预留 benchmark 模块：延迟、质量、推理、自定义数据集四类指标框架。
- 无构建步骤，服务器安装 Node.js 18+ 后可直接运行。

## 项目结构

```text
.
├── public/              # 前端静态页面、样式和交互逻辑
├── src/providers.js     # 厂商配置、默认模型和 benchmark 框架
├── server.js            # HTTP 服务、静态资源、API 代理、SSE 转发
├── package.json         # 运行脚本
└── README.md
```

## 运行方式

```bash
npm start
```

默认监听 `0.0.0.0:3000`。如需指定端口：

```bash
PORT=8080 npm start
```

## 检查命令

```bash
npm run check
```

## 参考文档

- OpenAI Chat Completions: https://platform.openai.com/docs/api-reference/chat/create-chat-completion
- Anthropic Messages Streaming: https://docs.anthropic.com/claude/reference/messages-streaming
- Google Gemini API: https://ai.google.dev/docs/gemini_api_overview
- 智谱 GLM Chat Completions: https://docs.bigmodel.cn/api-reference
- Qwen OpenAI 兼容接口: https://help.aliyun.com/zh/model-studio/qwen-api-via-openai-chat-completions
- DeepSeek Chat Completions: https://api-docs.deepseek.com/api/create-chat-completion
- MiniMax Text Chat: https://platform.minimax.io/docs/api-reference/text-chat
- SiliconFlow Chat Completions: https://docs.siliconflow.com/en/api-reference/chat-completions/chat-completions
- OpenRouter Chat Completions: https://openrouter.ai/docs/api-reference/chat-completion
