from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen
import base64
import hashlib
import hmac
import json
import os
import secrets
import threading
import time
import uuid


ROOT = Path(__file__).resolve().parent
PUBLIC_DIR = ROOT / "public"
DATA_DIR = ROOT / "data"
RECORDS_FILE = DATA_DIR / "records.json"
SESSION_SECRET_FILE = DATA_DIR / "session_secret"
MAX_BODY_BYTES = 12 * 1024 * 1024
ALLOWED_USER = "yiiwang"
SESSION_COOKIE = "studio_session"
SESSION_MAX_AGE = 60 * 60 * 24 * 14
DATA_LOCK = threading.Lock()


PROVIDERS = [
    {
        "id": "openai",
        "name": "OpenAI",
        "adapter": "openai-compatible",
        "baseUrl": "https://api.openai.com/v1",
        "defaultModel": "gpt-5.5",
        "models": ["gpt-5.5", "gpt-5.4", "gpt-5.4-mini", "gpt-5.4-nano", "gpt-5.2"],
        "docs": "https://platform.openai.com/docs/api-reference/chat/create-chat-completion",
        "capabilities": ["stream", "text", "tools"],
    },
    {
        "id": "anthropic",
        "name": "Anthropic",
        "adapter": "anthropic",
        "baseUrl": "https://api.anthropic.com/v1",
        "defaultModel": "claude-sonnet-4-5",
        "models": ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5"],
        "docs": "https://docs.anthropic.com/claude/reference/messages-streaming",
        "capabilities": ["stream", "text", "thinking"],
    },
    {
        "id": "google",
        "name": "Google Gemini",
        "adapter": "gemini",
        "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
        "defaultModel": "gemini-2.5-pro",
        "models": ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
        "docs": "https://ai.google.dev/docs/gemini_api_overview",
        "capabilities": ["stream", "text", "multimodal"],
    },
    {
        "id": "zhipu",
        "name": "Zhipu GLM",
        "adapter": "openai-compatible",
        "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
        "defaultModel": "glm-4.7",
        "models": [
            "glm-4.7",
            "glm-4.6",
            "glm-4.5",
            "glm-4.5-air",
            "glm-4.5-x",
            "glm-4.5-airx",
            "glm-4.5-flash",
            "glm-4.5v",
            "glm-4.1v-thinking",
            "glm-z1-air",
            "glm-z1-flash",
        ],
        "docs": "https://docs.bigmodel.cn/api-reference",
        "thinkingMode": "thinking-object",
        "capabilities": ["stream", "text", "thinking", "multimodal"],
    },
    {
        "id": "qwen",
        "name": "Qwen / DashScope",
        "adapter": "openai-compatible",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "defaultModel": "qwen-plus",
        "models": [
            "qwen3.6-plus",
            "qwen3.5-plus",
            "qwen3.5-flash",
            "qwen3-max",
            "qwen-plus",
            "qwen-flash",
            "qwen-turbo",
            "qwen3-coder-plus",
            "qwen3-coder-flash",
            "qwen3-235b-a22b-thinking-2507",
            "qwen3-235b-a22b-instruct-2507",
            "qwen3-32b",
            "qwen3-14b",
            "qwen3-8b",
            "qwen3-vl-plus",
            "qwen3-vl-flash",
            "qwen3-vl-235b-a22b-thinking",
            "qwen3-vl-235b-a22b-instruct",
            "qwen3-vl-32b-instruct",
            "qwen3-vl-30b-a3b-thinking",
            "qwen3-vl-30b-a3b-instruct",
            "qwen3-vl-8b-thinking",
            "qwen3-vl-8b-instruct",
            "qwen-vl-max",
            "qwen-vl-max-latest",
            "qwen-vl-plus",
            "qwen-vl-plus-latest",
            "qwen-vl-ocr",
            "qwen-vl-ocr-latest",
            "qvq-max",
            "qvq-max-latest",
            "qvq-plus",
            "qvq-plus-latest",
            "qwen3-omni-flash",
            "qwen-omni-turbo",
        ],
        "docs": "https://help.aliyun.com/zh/model-studio/qwen-api-via-openai-chat-completions",
        "thinkingMode": "enable-thinking",
        "capabilities": ["stream", "text", "thinking", "multimodal"],
    },
    {
        "id": "deepseek",
        "name": "DeepSeek",
        "adapter": "openai-compatible",
        "baseUrl": "https://api.deepseek.com",
        "defaultModel": "deepseek-v4-flash",
        "models": ["deepseek-v4-flash", "deepseek-v4-pro", "deepseek-chat", "deepseek-reasoner"],
        "docs": "https://api-docs.deepseek.com/api/create-chat-completion",
        "thinkingMode": "thinking-object",
        "capabilities": ["stream", "text", "thinking"],
    },
    {
        "id": "xiaomi",
        "name": "Xiaomi MiMo",
        "adapter": "openai-compatible",
        "baseUrl": "https://api.xiaomimimo.com/v1",
        "defaultModel": "MiMo-V2-Flash",
        "models": ["MiMo-V2-Flash", "MiMo-V2-Pro", "MiMo-V2-Omni", "MiMo-V2-TTS"],
        "docs": "https://www.xiaomi-mimo-ai.com/",
        "thinkingMode": "thinking-object",
        "capabilities": ["stream", "text", "thinking", "multimodal"],
    },
    {
        "id": "minimax",
        "name": "MiniMax",
        "adapter": "openai-compatible",
        "baseUrl": "https://api.minimax.io/v1",
        "defaultModel": "MiniMax-M2.7",
        "models": [
            "MiniMax-M2.7",
            "MiniMax-M2.7-highspeed",
            "MiniMax-M2.5",
            "MiniMax-M2.5-highspeed",
            "MiniMax-M2.1",
            "MiniMax-M2.1-highspeed",
            "MiniMax-M2",
        ],
        "docs": "https://platform.minimax.io/docs/api-reference/text-chat",
        "capabilities": ["stream", "text", "thinking"],
    },
    {
        "id": "siliconflow",
        "name": "SiliconFlow",
        "adapter": "openai-compatible",
        "baseUrl": "https://api.siliconflow.com/v1",
        "defaultModel": "Qwen/Qwen3-235B-A22B-Thinking-2507",
        "models": [
            "deepseek-ai/DeepSeek-V3.2",
            "deepseek-ai/DeepSeek-R1",
            "Qwen/Qwen3-235B-A22B-Thinking-2507",
            "zai-org/GLM-5.1",
            "MiniMaxAI/MiniMax-M2.5",
        ],
        "docs": "https://docs.siliconflow.com/en/api-reference/chat-completions/chat-completions",
        "thinkingMode": "enable-thinking",
        "capabilities": ["stream", "text", "thinking", "gateway"],
    },
    {
        "id": "openrouter",
        "name": "OpenRouter",
        "adapter": "openai-compatible",
        "baseUrl": "https://openrouter.ai/api/v1",
        "defaultModel": "openai/gpt-5.5",
        "models": [
            "openai/gpt-5.5",
            "openai/gpt-5.4",
            "anthropic/claude-sonnet-4.5",
            "google/gemini-2.5-pro",
            "deepseek/deepseek-v4-flash",
        ],
        "docs": "https://openrouter.ai/docs/api-reference/chat-completion",
        "extraHeaders": {"HTTP-Referer": "http://localhost", "X-Title": "LLM API Test Studio"},
        "capabilities": ["stream", "text", "gateway"],
    },
]


BENCHMARKS = [
    {
        "id": "latency",
        "name": "Latency",
        "status": "planned",
        "metrics": ["first_token_ms", "total_ms", "tokens_per_second"],
        "description": "Measures response speed and streaming cadence for identical prompts.",
    },
    {
        "id": "quality",
        "name": "Quality",
        "status": "planned",
        "metrics": ["judge_score", "pass_rate", "format_accuracy"],
        "description": "Keeps a hook for model-graded and rule-based answer quality checks.",
    },
    {
        "id": "reasoning",
        "name": "Reasoning",
        "status": "planned",
        "metrics": ["pass_at_1", "reasoning_tokens", "cost_per_pass"],
        "description": "Reserved for GPQA, math, coding, and long-context reasoning tasks.",
    },
    {
        "id": "custom",
        "name": "Custom Set",
        "status": "planned",
        "metrics": ["dataset_score", "cost", "regression_delta"],
        "description": "Provides the future extension point for user-supplied benchmark files.",
    },
]


class Handler(SimpleHTTPRequestHandler):
    server_version = "LLMApiTestStudio/0.1"

    def translate_path(self, path):
        relative = path.split("?", 1)[0].split("#", 1)[0].lstrip("/") or "index.html"
        target = (PUBLIC_DIR / relative).resolve()
        if not str(target).startswith(str(PUBLIC_DIR.resolve())) or not target.exists():
            return str(PUBLIC_DIR / "index.html")
        return str(target)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            self.send_json(200, {"ok": True, "name": "LLM API Test Studio"})
            return
        if path == "/api/session":
            user = self.current_user()
            self.send_json(200, {"authenticated": bool(user), "user": user})
            return

        if path.startswith("/api/") and not self.require_auth():
            return

        if path == "/api/providers":
            self.send_json(200, {"providers": public_providers(), "benchmarks": BENCHMARKS})
            return
        if path == "/api/benchmarks":
            self.send_json(200, {"benchmarks": BENCHMARKS})
            return
        if path == "/api/records":
            self.handle_records_list()
            return
        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/login":
            self.handle_login()
            return
        if path == "/api/logout":
            self.handle_logout()
            return

        if path.startswith("/api/") and not self.require_auth():
            return

        if path == "/api/models":
            self.handle_models()
            return
        if path == "/api/records":
            self.handle_record_save()
            return
        if path == "/api/benchmarks/run":
            self.send_json(
                202,
                {
                    "status": "planned",
                    "message": "Benchmark runner interface is reserved; execution is not implemented yet.",
                    "benchmarks": BENCHMARKS,
                },
            )
            return
        if path == "/api/chat":
            self.handle_chat()
            return
        self.send_json(405, {"error": "Method not allowed"})

    def do_DELETE(self):
        path = urlparse(self.path).path
        if path.startswith("/api/") and not self.require_auth():
            return
        if path.startswith("/api/records/"):
            self.handle_record_delete(path.rsplit("/", 1)[-1])
            return
        self.send_json(405, {"error": "Method not allowed"})

    def send_json(self, status, payload):
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def handle_login(self):
        try:
            payload = self.read_json()
        except (ValueError, json.JSONDecodeError) as error:
            self.send_json(400, {"error": str(error)})
            return

        user = str(payload.get("user") or "").strip()
        if user != ALLOWED_USER:
            self.send_json(401, {"error": "Invalid user"})
            return

        token = create_session_token(user)
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header(
            "Set-Cookie",
            f"{SESSION_COOKIE}={token}; Max-Age={SESSION_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax",
        )
        self.end_headers()
        self.wfile.write(json.dumps({"authenticated": True, "user": user}).encode("utf-8"))

    def handle_logout(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Set-Cookie", f"{SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax")
        self.end_headers()
        self.wfile.write(json.dumps({"authenticated": False}).encode("utf-8"))

    def current_user(self):
        token = parse_cookie(self.headers.get("Cookie", "")).get(SESSION_COOKIE)
        return verify_session_token(token)

    def require_auth(self):
        if self.current_user():
            return True
        self.send_json(401, {"error": "Authentication required"})
        return False

    def handle_records_list(self):
        user = self.current_user()
        records = [
            record
            for record in read_records().get("records", [])
            if record.get("user") == user
        ]
        records.sort(key=lambda item: item.get("updatedAt", ""), reverse=True)
        self.send_json(200, {"records": records})

    def handle_record_save(self):
        user = self.current_user()
        try:
            payload = self.read_json()
        except (ValueError, json.JSONDecodeError) as error:
            self.send_json(400, {"error": str(error)})
            return

        record = sanitize_record(payload, user)
        now = iso_now()

        with DATA_LOCK:
            data = read_records_unlocked()
            records = data.setdefault("records", [])
            existing = next(
                (
                    item
                    for item in records
                    if item.get("id") == record.get("id") and item.get("user") == user
                ),
                None,
            )
            if existing:
                record["createdAt"] = existing.get("createdAt") or now
                record["updatedAt"] = now
                existing.clear()
                existing.update(record)
            else:
                record["id"] = record.get("id") or uuid.uuid4().hex
                record["createdAt"] = now
                record["updatedAt"] = now
                records.append(record)
            write_records_unlocked(data)

        self.send_json(200, {"record": record})

    def handle_record_delete(self, record_id):
        user = self.current_user()
        with DATA_LOCK:
            data = read_records_unlocked()
            records = data.setdefault("records", [])
            next_records = [
                item
                for item in records
                if not (item.get("id") == record_id and item.get("user") == user)
            ]
            deleted = len(next_records) != len(records)
            data["records"] = next_records
            write_records_unlocked(data)

        if not deleted:
            self.send_json(404, {"error": "Record not found"})
            return
        self.send_json(200, {"deleted": True})

    def handle_models(self):
        try:
            payload = self.read_json()
        except (ValueError, json.JSONDecodeError) as error:
            self.send_json(400, {"error": str(error)})
            return

        provider = get_provider(payload.get("providerId"))
        if not provider:
            self.send_json(400, {"error": "Unknown provider"})
            return

        api_key = str(payload.get("apiKey") or "").strip()
        base_url = str(payload.get("baseUrl") or provider["baseUrl"]).strip()

        try:
            upstream = build_models_request(provider, api_key, base_url)
            request = Request(upstream["url"], headers=upstream["headers"], method="GET")
            with urlopen(request, timeout=45) as response:
                raw = response.read().decode("utf-8", "replace")
            data = json.loads(raw or "{}")
            models = normalize_model_list(provider, data)
            if not models:
                self.send_json(
                    502,
                    {
                        "error": "Model list response did not contain selectable models",
                        "details": data,
                        "fallbackModels": provider.get("models", []),
                    },
                )
                return
            self.send_json(
                200,
                {
                    "providerId": provider["id"],
                    "source": "live",
                    "models": models,
                    "fallbackModels": provider.get("models", []),
                },
            )
        except HTTPError as error:
            details = error.read().decode("utf-8", "replace")
            self.send_json(
                error.code,
                {
                    "error": f"Upstream model list request failed with {error.code}",
                    "status": error.code,
                    "details": safe_parse_json(details),
                    "fallbackModels": provider.get("models", []),
                },
            )
        except ValueError as error:
            self.send_json(
                400,
                {
                    "error": str(error),
                    "details": str(error),
                    "fallbackModels": provider.get("models", []),
                },
            )
        except (json.JSONDecodeError, URLError, TimeoutError, OSError) as error:
            self.send_json(
                502,
                {
                    "error": "Failed to refresh model list",
                    "details": str(error),
                    "fallbackModels": provider.get("models", []),
                },
            )

    def read_json(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length > MAX_BODY_BYTES:
            raise ValueError("Request body is too large")
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8") or "{}")

    def handle_chat(self):
        try:
            payload = self.read_json()
        except (ValueError, json.JSONDecodeError) as error:
            self.send_json(400, {"error": str(error)})
            return

        provider = get_provider(payload.get("providerId"))
        api_key = str(payload.get("apiKey") or "").strip()
        model = str(payload.get("model") or provider.get("defaultModel") if provider else "").strip()

        if not provider:
            self.send_json(400, {"error": "Unknown provider"})
            return
        if not api_key:
            self.send_json(400, {"error": "API key is required"})
            return
        if not model:
            self.send_json(400, {"error": "Model is required"})
            return

        messages = normalize_messages(payload.get("messages"), payload.get("systemPrompt"))
        if not any(message["role"] == "user" for message in messages):
            self.send_json(400, {"error": "At least one user message is required"})
            return

        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream; charset=utf-8")
        self.send_header("Connection", "keep-alive")
        self.send_header("X-Accel-Buffering", "no")
        self.end_headers()

        started = time.time()
        self.write_sse(
            "meta",
            {
                "provider": provider["id"],
                "providerName": provider["name"],
                "model": model,
                "startedAt": iso_now(),
            },
        )

        try:
            upstream = build_upstream_request(
                provider,
                {
                    **payload,
                    "apiKey": api_key,
                    "model": model,
                    "messages": messages,
                },
            )
            request = Request(
                upstream["url"],
                data=json.dumps(upstream["body"]).encode("utf-8"),
                headers=upstream["headers"],
                method="POST",
            )
            with urlopen(request, timeout=180) as response:
                if provider["adapter"] == "anthropic":
                    relay_anthropic_stream(response, self)
                elif provider["adapter"] == "gemini":
                    relay_gemini_stream(response, self)
                else:
                    relay_openai_compatible_stream(response, self)
            self.write_sse(
                "done",
                {"totalMs": int((time.time() - started) * 1000), "finishedAt": iso_now()},
            )
        except HTTPError as error:
            details = error.read().decode("utf-8", "replace")
            self.write_sse(
                "error",
                {
                    "message": f"Upstream request failed with {error.code}",
                    "status": error.code,
                    "details": details[:2000],
                },
            )
        except (ValueError, URLError, TimeoutError, OSError) as error:
            self.write_sse("error", {"message": str(error), "details": str(error)})

    def write_sse(self, event, payload):
        data = json.dumps(payload, ensure_ascii=False)
        try:
            self.wfile.write(f"event: {event}\n".encode("utf-8"))
            self.wfile.write(f"data: {data}\n\n".encode("utf-8"))
            self.wfile.flush()
        except BrokenPipeError:
            raise ConnectionError("Client disconnected")


def public_providers():
    keys = {"id", "name", "adapter", "baseUrl", "defaultModel", "models", "docs", "capabilities"}
    return [{key: provider[key] for key in keys if key in provider} for provider in PROVIDERS]


def parse_cookie(header):
    cookies = {}
    for part in (header or "").split(";"):
        if "=" not in part:
            continue
        key, value = part.split("=", 1)
        cookies[key.strip()] = value.strip()
    return cookies


def get_session_secret():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if SESSION_SECRET_FILE.exists():
        return SESSION_SECRET_FILE.read_bytes()
    secret = secrets.token_bytes(32)
    SESSION_SECRET_FILE.write_bytes(secret)
    os.chmod(SESSION_SECRET_FILE, 0o600)
    return secret


def b64_encode(raw):
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def b64_decode(value):
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode((value + padding).encode("ascii"))


def create_session_token(user):
    payload = {
        "user": user,
        "exp": int(time.time()) + SESSION_MAX_AGE,
        "nonce": secrets.token_urlsafe(12),
    }
    payload_bytes = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    encoded = b64_encode(payload_bytes)
    signature = hmac.new(get_session_secret(), encoded.encode("ascii"), hashlib.sha256).digest()
    return f"{encoded}.{b64_encode(signature)}"


def verify_session_token(token):
    if not token or "." not in token:
        return None
    encoded, signature = token.split(".", 1)
    expected = b64_encode(hmac.new(get_session_secret(), encoded.encode("ascii"), hashlib.sha256).digest())
    if not hmac.compare_digest(signature, expected):
        return None
    try:
        payload = json.loads(b64_decode(encoded).decode("utf-8"))
    except (ValueError, json.JSONDecodeError):
        return None
    if payload.get("user") != ALLOWED_USER:
        return None
    if int(payload.get("exp") or 0) < int(time.time()):
        return None
    return payload["user"]


def read_records():
    with DATA_LOCK:
        return read_records_unlocked()


def read_records_unlocked():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not RECORDS_FILE.exists():
        return {"records": []}
    try:
        data = json.loads(RECORDS_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"records": []}
    if not isinstance(data, dict) or not isinstance(data.get("records"), list):
        return {"records": []}
    return data


def write_records_unlocked(data):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    temp_file = RECORDS_FILE.with_suffix(".tmp")
    temp_file.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    temp_file.replace(RECORDS_FILE)


def sanitize_record(payload, user):
    messages = sanitize_messages_for_record(payload.get("messages"))
    title = safe_string(payload.get("title"), 120) or title_from_messages(messages)
    return {
        "id": safe_string(payload.get("id"), 80),
        "user": user,
        "title": title,
        "providerId": safe_string(payload.get("providerId"), 80),
        "model": safe_string(payload.get("model"), 180),
        "baseUrl": safe_string(payload.get("baseUrl"), 400),
        "systemPrompt": safe_string(payload.get("systemPrompt"), 8000),
        "parameters": sanitize_parameters_for_record(payload.get("parameters")),
        "messages": messages,
    }


def sanitize_messages_for_record(messages):
    if not isinstance(messages, list):
        return []
    sanitized = []
    for message in messages[-80:]:
        if not isinstance(message, dict):
            continue
        role = str(message.get("role") or "").lower()
        if role not in {"system", "user", "assistant"}:
            continue
        item = {
            "role": role,
            "content": safe_string(message.get("content"), 50000),
        }
        attachments = sanitize_attachments(message.get("attachments"))
        if attachments:
            item["attachments"] = attachments
        if message.get("reasoning"):
            item["reasoning"] = safe_string(message.get("reasoning"), 50000)
        if isinstance(message.get("usage"), dict):
            item["usage"] = message["usage"]
        sanitized.append(item)
    return sanitized


def sanitize_parameters_for_record(parameters):
    if not isinstance(parameters, dict):
        return {}
    allowed = {"temperature", "topP", "maxTokens", "thinkingBudget", "thinkingEnabled", "reasoningEffort"}
    return {key: parameters[key] for key in allowed if key in parameters}


def title_from_messages(messages):
    for message in messages:
        if message.get("role") == "user" and message.get("content"):
            return safe_string(message["content"].replace("\n", " "), 72)
    return "Untitled record"


def safe_string(value, limit):
    if value is None:
        return ""
    return str(value).strip()[:limit]


def get_provider(provider_id):
    return next((provider for provider in PROVIDERS if provider["id"] == provider_id), None)


def normalize_messages(messages, system_prompt):
    normalized = []
    system = str(system_prompt or "").strip()
    if system:
        normalized.append({"role": "system", "content": system})

    if not isinstance(messages, list):
        return normalized

    for message in messages:
        role = str(message.get("role") or "").lower()
        content = message.get("content")
        attachments = sanitize_attachments(message.get("attachments"))
        if role in {"system", "user", "assistant"} and isinstance(content, str) and (content.strip() or attachments):
            item = {"role": role, "content": content.strip()}
            if role == "user" and attachments:
                item["attachments"] = attachments
            normalized.append(item)

    return normalized[-40:]


def sanitize_attachments(attachments):
    if not isinstance(attachments, list):
        return []
    sanitized = []
    for attachment in attachments[:8]:
        if not isinstance(attachment, dict):
            continue
        kind = str(attachment.get("kind") or "").strip()
        mime_type = str(attachment.get("mimeType") or "").strip()
        name = safe_string(attachment.get("name"), 180) or "attachment"
        if kind == "image" and mime_type.startswith("image/"):
            data_url = str(attachment.get("dataUrl") or "").strip()
            if data_url.startswith("data:image/") and len(data_url) <= 7_000_000:
                sanitized.append(
                    {
                        "kind": "image",
                        "name": name,
                        "mimeType": mime_type,
                        "dataUrl": data_url,
                    }
                )
        elif kind == "text":
            text = safe_string(attachment.get("text"), 250000)
            if text:
                sanitized.append(
                    {
                        "kind": "text",
                        "name": name,
                        "mimeType": mime_type or "text/plain",
                        "text": text,
                    }
                )
    return sanitized


def build_upstream_request(provider, payload):
    if provider["adapter"] == "anthropic":
        return build_anthropic_request(provider, payload)
    if provider["adapter"] == "gemini":
        return build_gemini_request(provider, payload)
    return build_openai_compatible_request(provider, payload)


def build_models_request(provider, api_key, base_url):
    base = normalize_base_url(base_url)
    headers = {"Accept": "application/json"}

    if provider["adapter"] == "anthropic":
        if not api_key:
            raise ValueError("API key is required to refresh Anthropic models")
        headers.update({"x-api-key": api_key, "anthropic-version": "2023-06-01"})
        return {"url": f"{base}/models", "headers": headers}

    if provider["adapter"] == "gemini":
        if not api_key:
            raise ValueError("API key is required to refresh Gemini models")
        return {"url": f"{base}/models?key={quote(api_key, safe='')}", "headers": headers}

    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    elif provider["id"] != "openrouter":
        raise ValueError("API key is required to refresh this provider's models")

    headers.update(provider.get("extraHeaders", {}))
    return {"url": f"{base}/models", "headers": headers}


def normalize_model_list(provider, payload):
    if provider["adapter"] == "gemini":
        items = payload.get("models") if isinstance(payload, dict) else []
        models = []
        for item in items or []:
            methods = item.get("supportedGenerationMethods") or []
            if methods and "generateContent" not in methods and "streamGenerateContent" not in methods:
                continue
            raw_id = item.get("name") or item.get("id")
            model_id = str(raw_id or "").removeprefix("models/").strip()
            if model_id:
                models.append(
                    {
                        "id": model_id,
                        "name": item.get("displayName") or model_id,
                        "created": item.get("version"),
                        "owner": "google",
                    }
                )
        return dedupe_models(models)

    items = []
    if isinstance(payload, dict):
        if isinstance(payload.get("data"), list):
            items = payload["data"]
        elif isinstance(payload.get("models"), list):
            items = payload["models"]
        elif isinstance(payload.get("result"), list):
            items = payload["result"]

    models = []
    for item in items:
        if not isinstance(item, dict):
            continue
        model_id = str(item.get("id") or item.get("name") or item.get("model") or "").strip()
        if not model_id:
            continue
        models.append(
            {
                "id": model_id,
                "name": item.get("display_name") or item.get("displayName") or model_id,
                "created": item.get("created") or item.get("created_at"),
                "owner": item.get("owned_by") or item.get("owner"),
            }
        )
    return dedupe_models(models)


def dedupe_models(models):
    seen = set()
    unique = []
    for model in models:
        if model["id"] in seen:
            continue
        seen.add(model["id"])
        unique.append(model)
    return sorted(unique, key=lambda item: str(item["id"]).lower())


def openai_message_content(provider, message):
    attachments = message.get("attachments") or []
    if not attachments:
        return message["content"]
    parts = []
    text = text_with_attachments(message["content"], attachments)
    if text:
        parts.append({"type": "text", "text": text})
    for attachment in attachments:
        if attachment.get("kind") == "image":
            image_url = attachment["dataUrl"]
            if provider["id"] == "zhipu":
                _, data = data_url_payload(image_url)
                image_url = data or image_url
            parts.append({"type": "image_url", "image_url": {"url": image_url}})
    return parts


def text_with_attachments(content, attachments):
    text_parts = [content] if content else []
    for attachment in attachments:
        if attachment.get("kind") == "text":
            text_parts.append(
                f"\n\n[Attached file: {attachment.get('name', 'file')}]\n{attachment.get('text', '')}"
            )
    return "\n".join(part for part in text_parts if part)


def data_url_payload(data_url):
    if "," not in data_url:
        return "", ""
    header, data = data_url.split(",", 1)
    mime_type = header.removeprefix("data:").split(";", 1)[0] or "application/octet-stream"
    return mime_type, data


def build_openai_compatible_request(provider, payload):
    params = normalize_parameters(payload.get("parameters") or {})
    body = {
        "model": payload["model"],
        "messages": [
            {
                "role": message["role"],
                "content": openai_message_content(provider, message),
            }
            for message in payload["messages"]
        ],
        "stream": True,
        "stream_options": {"include_usage": True},
        "temperature": params["temperature"],
        "top_p": params["topP"],
        "max_tokens": params["maxTokens"],
    }

    if params["thinkingEnabled"]:
        if provider.get("thinkingMode") == "thinking-object":
            body["thinking"] = {"type": "enabled", "reasoning_effort": params["reasoningEffort"]}
        if provider.get("thinkingMode") == "enable-thinking":
            body["enable_thinking"] = True
            body["thinking_budget"] = params["thinkingBudget"]

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {payload['apiKey']}",
        **provider.get("extraHeaders", {}),
    }
    return {
        "url": f"{normalize_base_url(payload.get('baseUrl') or provider['baseUrl'])}/chat/completions",
        "headers": headers,
        "body": body,
    }


def build_anthropic_request(provider, payload):
    params = normalize_parameters(payload.get("parameters") or {})
    system_messages = [message["content"] for message in payload["messages"] if message["role"] == "system"]
    messages = []
    for message in payload["messages"]:
        if message["role"] == "system":
            continue
        content = message["content"]
        attachments = message.get("attachments") or []
        if message["role"] == "user" and attachments:
            blocks = []
            for attachment in attachments:
                if attachment.get("kind") == "image":
                    mime_type, data = data_url_payload(attachment["dataUrl"])
                    blocks.append(
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": mime_type,
                                "data": data,
                            },
                        }
                    )
            text = text_with_attachments(content, attachments)
            if text:
                blocks.append({"type": "text", "text": text})
            content = blocks or content
        messages.append(
            {
                "role": "assistant" if message["role"] == "assistant" else "user",
                "content": content,
            }
        )
    body = {
        "model": payload["model"],
        "max_tokens": params["maxTokens"],
        "messages": messages,
        "stream": True,
    }
    if system_messages:
        body["system"] = "\n\n".join(system_messages)
    if params["thinkingEnabled"]:
        budget_tokens = min(params["thinkingBudget"], max(128, params["maxTokens"] - 1))
        body["max_tokens"] = max(params["maxTokens"], budget_tokens + 1)
        body["thinking"] = {"type": "enabled", "budget_tokens": budget_tokens}
    else:
        body["temperature"] = params["temperature"]
        body["top_p"] = params["topP"]

    return {
        "url": f"{normalize_base_url(payload.get('baseUrl') or provider['baseUrl'])}/messages",
        "headers": {
            "Content-Type": "application/json",
            "x-api-key": payload["apiKey"],
            "anthropic-version": "2023-06-01",
        },
        "body": body,
    }


def build_gemini_request(provider, payload):
    params = normalize_parameters(payload.get("parameters") or {})
    system_prompt = "\n\n".join(
        message["content"] for message in payload["messages"] if message["role"] == "system"
    )
    contents = []
    for message in payload["messages"]:
        if message["role"] == "system":
            continue
        attachments = message.get("attachments") or []
        parts = []
        text = text_with_attachments(message["content"], attachments)
        if text:
            parts.append({"text": text})
        for attachment in attachments:
            if attachment.get("kind") == "image":
                mime_type, data = data_url_payload(attachment["dataUrl"])
                parts.append({"inline_data": {"mime_type": mime_type, "data": data}})
        contents.append(
            {
                "role": "model" if message["role"] == "assistant" else "user",
                "parts": parts or [{"text": message["content"]}],
            }
        )
    body = {
        "contents": contents,
        "generationConfig": {
            "temperature": params["temperature"],
            "topP": params["topP"],
            "maxOutputTokens": params["maxTokens"],
        },
    }
    if system_prompt:
        body["systemInstruction"] = {"parts": [{"text": system_prompt}]}
    if params["thinkingEnabled"]:
        body["generationConfig"]["thinkingConfig"] = {
            "includeThoughts": True,
            "thinkingBudget": params["thinkingBudget"],
        }

    model = quote(payload["model"], safe="")
    key = quote(payload["apiKey"], safe="")
    return {
        "url": f"{normalize_base_url(payload.get('baseUrl') or provider['baseUrl'])}/models/{model}:streamGenerateContent?alt=sse&key={key}",
        "headers": {"Content-Type": "application/json"},
        "body": body,
    }


def normalize_parameters(raw):
    return {
        "temperature": clamp_number(raw.get("temperature"), 0, 2, 0.7),
        "topP": clamp_number(raw.get("topP"), 0, 1, 0.9),
        "maxTokens": round(clamp_number(raw.get("maxTokens"), 128, 32768, 2048)),
        "thinkingEnabled": bool(raw.get("thinkingEnabled")),
        "thinkingBudget": round(clamp_number(raw.get("thinkingBudget"), 128, 32768, 2048)),
        "reasoningEffort": raw.get("reasoningEffort")
        if raw.get("reasoningEffort") in {"low", "medium", "high", "max"}
        else "high",
    }


def clamp_number(value, minimum, maximum, fallback):
    try:
        number = float(value)
    except (TypeError, ValueError):
        return fallback
    return min(maximum, max(minimum, number))


def normalize_base_url(value):
    parsed = urlparse(str(value or "").strip())
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("Base URL must start with http or https")
    return str(value).rstrip("/")


def relay_openai_compatible_stream(response, handler):
    for event in iter_sse(response):
        data = parse_json(event["data"])
        if not data:
            continue
        if data.get("error"):
            handler.write_sse(
                "error",
                {
                    "message": data["error"].get("message") or "Upstream error",
                    "details": data["error"],
                },
            )
            continue
        choices = data.get("choices") or []
        choice = choices[0] if choices else {}
        delta = choice.get("delta") or {}
        message = choice.get("message") or {}
        reasoning = delta.get("reasoning_content") or delta.get("reasoning") or message.get("reasoning_content")
        content = delta.get("content") if "content" in delta else message.get("content")
        if isinstance(reasoning, str) and reasoning:
            handler.write_sse("reasoning", {"text": reasoning})
        if isinstance(content, str) and content:
            handler.write_sse("token", {"text": content})
        if data.get("usage"):
            handler.write_sse("usage", data["usage"])


def relay_anthropic_stream(response, handler):
    for event in iter_sse(response):
        data = parse_json(event["data"])
        if not data:
            continue
        if data.get("type") == "error":
            handler.write_sse(
                "error",
                {"message": (data.get("error") or {}).get("message") or "Anthropic stream error"},
            )
            continue
        if data.get("type") == "content_block_delta":
            delta = data.get("delta") or {}
            if isinstance(delta.get("thinking"), str) and delta["thinking"]:
                handler.write_sse("reasoning", {"text": delta["thinking"]})
            if isinstance(delta.get("text"), str) and delta["text"]:
                handler.write_sse("token", {"text": delta["text"]})
        if data.get("type") == "message_delta" and data.get("usage"):
            handler.write_sse("usage", data["usage"])


def relay_gemini_stream(response, handler):
    for event in iter_sse(response):
        data = parse_json(event["data"])
        if not data:
            continue
        if data.get("error"):
            handler.write_sse(
                "error",
                {
                    "message": data["error"].get("message") or "Gemini stream error",
                    "details": data["error"],
                },
            )
            continue
        for candidate in data.get("candidates") or []:
            content = candidate.get("content") or {}
            for part in content.get("parts") or []:
                text = part.get("text")
                if isinstance(text, str) and text:
                    handler.write_sse("reasoning" if part.get("thought") else "token", {"text": text})
        if data.get("usageMetadata"):
            handler.write_sse("usage", data["usageMetadata"])


def iter_sse(response):
    buffer = ""
    while True:
        chunk = response.read(4096)
        if not chunk:
            break
        buffer += chunk.decode("utf-8", "replace")
        frames = buffer.replace("\r\n", "\n").split("\n\n")
        buffer = frames.pop()
        for frame in frames:
            event = parse_sse_frame(frame)
            if event and event["data"] != "[DONE]":
                yield event
    if buffer.strip():
        event = parse_sse_frame(buffer)
        if event and event["data"] != "[DONE]":
            yield event


def parse_sse_frame(frame):
    event = "message"
    data = []
    for line in frame.splitlines():
        if line.startswith("event:"):
            event = line[6:].strip()
        elif line.startswith("data:"):
            data.append(line[5:].lstrip())
    if not data:
        return None
    return {"event": event, "data": "\n".join(data)}


def parse_json(value):
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return None


def safe_parse_json(value):
    parsed = parse_json(value)
    if parsed is not None:
        return parsed
    return value[:4000]


def iso_now():
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def main():
    port = int(os.environ.get("PORT", "3000"))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"LLM API Test Studio running at http://0.0.0.0:{port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
