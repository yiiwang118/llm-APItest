# LLM API Test Studio

一个用于测试多厂商大模型 API 的前后端一体 Web 工作台。当前版本提供模型厂商选择、API Key 临时输入、流式输出、推理过程分栏展示，以及后续 benchmark 能力的接口和页面框架。

## 功能范围

- 支持 OpenAI、Anthropic、Google Gemini、智谱 GLM、Qwen / DashScope、DeepSeek、小米 MiMo、MiniMax、SiliconFlow、OpenRouter。
- 后端统一代理不同厂商的流式接口，前端按 `token`、`reasoning`、`usage` 标准事件渲染。
- 模型支持下拉建议和手动输入；API Key 填入后会自动尝试刷新厂商实时模型列表。
- 最大输出 tokens 和思考预算支持固定数值或无限制；无限制时后端不向上游发送对应限制字段，保留厂商默认策略。
- 模型列表支持按厂商动态刷新；成功时会合并实时列表和内置别名，并展示实时数量、合计数量和新增数量。
- 如果厂商接口失败，页面会展示上游状态码和响应内容，并保留内置模型列表可选。
- 多模态输入支持本地图片附件；文本、Markdown、CSV、JSON 文件会作为文本上下文追加到 prompt。
- API Key 不写入本地文件，只随当前请求发送到后端代理。
- 单用户内部登录，当前只允许 `yiiwang`；无开放注册入口。
- 支持对话记录保存、加载和删除，记录保存在服务器本地 `data/records.json`，不保存 API Key。
- 前端支持中文/英文界面切换。
- 预留 benchmark 模块：延迟、质量、推理、自定义数据集四类指标框架。
- 无构建步骤，无第三方依赖，服务器有 Python 3.10+ 即可直接运行。

## 项目结构

```text
.
├── public/              # 前端静态页面、样式和交互逻辑
├── server.py            # HTTP 服务、静态资源、API 代理、SSE 转发
└── README.md
```

## 运行方式

```bash
python3 server.py
```

默认监听 `0.0.0.0:3000`。如需指定端口：

```bash
PORT=8080 python3 server.py
```

## 检查命令

```bash
python3 -m py_compile server.py
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
