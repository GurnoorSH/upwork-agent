"""Local HTTP bridge for browser-backed AI generation."""

from __future__ import annotations

import json
from dataclasses import dataclass
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any, Callable, Protocol

from pydantic import ValidationError

from aigen.core.browser_client import BrowserLLMClient, BrowserLLMResponse
from aigen.domains.upwork import (
    UpworkPlatform,
    UpworkRankingRequest,
    build_upwork_ranking_prompt,
    parse_upwork_ranking_response,
)
from aigen.parsers.json_extract import extract_json_object


class LLMClientLike(Protocol):
    def generate(self, prompt: str) -> BrowserLLMResponse:
        ...


LLMClientFactory = Callable[[str, int, int], LLMClientLike]


@dataclass(frozen=True)
class BridgeConfig:
    host: str = "127.0.0.1"
    port: int = 8787
    debug_port: int = 9222
    platform: UpworkPlatform = "gemini"
    token: str = ""


def default_llm_client_factory(platform: str, debug_port: int, _timeout_ms: int) -> BrowserLLMClient:
    return BrowserLLMClient(platform=platform, debug_port=debug_port)


def create_bridge_server(
    config: BridgeConfig,
    llm_client_factory: LLMClientFactory = default_llm_client_factory,
) -> ThreadingHTTPServer:
    """Create a configured bridge server without starting its serve loop."""

    class BridgeRequestHandler(BaseHTTPRequestHandler):
        server_version = "aigen-bridge/0.1"

        def do_OPTIONS(self) -> None:
            self._send_json({"ok": True})

        def do_GET(self) -> None:
            if self.path == "/health":
                self._send_json(
                    {
                        "status": "ok",
                        "service": "aigen-bridge",
                        "platform": config.platform,
                        "debugPort": config.debug_port,
                    }
                )
                return
            self._send_error(HTTPStatus.NOT_FOUND, "Route not found.")

        def do_POST(self) -> None:
            if config.token and self.headers.get("X-Aigen-Bridge-Token") != config.token:
                self._send_error(HTTPStatus.UNAUTHORIZED, "Invalid bridge token.")
                return

            try:
                payload = self._read_json_body()
            except ValueError as exc:
                self._send_error(HTTPStatus.BAD_REQUEST, str(exc))
                return

            if self.path == "/rank-jobs":
                self._handle_rank_jobs(payload)
                return

            if self.path == "/generate-json":
                self._handle_generate_json(payload)
                return

            self._send_error(HTTPStatus.NOT_FOUND, "Route not found.")

        def log_message(self, _format: str, *args: Any) -> None:
            return

        def _handle_rank_jobs(self, payload: dict[str, Any]) -> None:
            payload = dict(payload)
            payload.setdefault("platform", config.platform)
            payload.setdefault("debugPort", config.debug_port)

            try:
                request = UpworkRankingRequest.model_validate(payload)
            except ValidationError as exc:
                self._send_error(HTTPStatus.BAD_REQUEST, "Invalid rank-jobs request.", details=exc.errors())
                return

            try:
                client = llm_client_factory(request.platform, request.debugPort, request.timeoutMs)
                prompt = build_upwork_ranking_prompt(request)
                llm_response = client.generate(prompt)
                ranking_response = parse_upwork_ranking_response(llm_response.text, request)
            except Exception as exc:
                self._send_error(HTTPStatus.BAD_GATEWAY, str(exc))
                return

            body = ranking_response.model_dump()
            body.setdefault("meta", {})
            body["meta"]["durationMs"] = llm_response.duration_ms
            body["meta"]["tabName"] = llm_response.tab_name
            self._send_json(body)

        def _handle_generate_json(self, payload: dict[str, Any]) -> None:
            prompt = payload.get("prompt")
            if not isinstance(prompt, str) or not prompt.strip():
                self._send_error(HTTPStatus.BAD_REQUEST, "'prompt' must be a non-empty string.")
                return

            platform = payload.get("platform", config.platform)
            debug_port = payload.get("debugPort", config.debug_port)
            timeout_ms = payload.get("timeoutMs", 180000)
            if platform not in {"gemini", "chatgpt", "claude", "perplexity"}:
                self._send_error(HTTPStatus.BAD_REQUEST, "Unsupported platform.")
                return

            try:
                debug_port = int(debug_port)
                timeout_ms = int(timeout_ms)
            except (TypeError, ValueError):
                self._send_error(HTTPStatus.BAD_REQUEST, "debugPort and timeoutMs must be integers.")
                return

            try:
                client = llm_client_factory(str(platform), debug_port, timeout_ms)
                llm_response = client.generate(prompt)
                parsed = extract_json_object(llm_response.text)
            except Exception as exc:
                self._send_error(HTTPStatus.BAD_GATEWAY, str(exc))
                return

            if not parsed:
                self._send_error(HTTPStatus.BAD_GATEWAY, "Model response did not include a valid JSON object.")
                return

            self._send_json(
                {
                    "json": parsed,
                    "meta": {
                        "platform": platform,
                        "durationMs": llm_response.duration_ms,
                        "tabName": llm_response.tab_name,
                    },
                }
            )

        def _read_json_body(self) -> dict[str, Any]:
            try:
                length = int(self.headers.get("Content-Length", "0"))
            except ValueError as exc:
                raise ValueError("Invalid Content-Length header.") from exc

            raw = self.rfile.read(length) if length > 0 else b"{}"
            try:
                parsed = json.loads(raw.decode("utf-8"))
            except Exception as exc:
                raise ValueError("Request body must be valid JSON.") from exc

            if not isinstance(parsed, dict):
                raise ValueError("Request body must be a JSON object.")
            return parsed

        def _send_json(self, body: dict[str, Any], status: HTTPStatus = HTTPStatus.OK) -> None:
            encoded = json.dumps(body, ensure_ascii=False, default=str).encode("utf-8")
            self.send_response(int(status))
            self._send_cors_headers()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(encoded)))
            self.end_headers()
            self.wfile.write(encoded)

        def _send_error(
            self,
            status: HTTPStatus,
            message: str,
            details: Any | None = None,
        ) -> None:
            body: dict[str, Any] = {"error": message}
            if details is not None:
                body["details"] = details
            self._send_json(body, status=status)

        def _send_cors_headers(self) -> None:
            origin = self.headers.get("Origin", "")
            allowed_origin = origin if _is_allowed_origin(origin) else "null"
            self.send_header("Access-Control-Allow-Origin", allowed_origin)
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Aigen-Bridge-Token")
            self.send_header("Vary", "Origin")

    return ThreadingHTTPServer((config.host, config.port), BridgeRequestHandler)


def run_bridge_server(
    host: str = "127.0.0.1",
    port: int = 8787,
    debug_port: int = 9222,
    platform: UpworkPlatform = "gemini",
    token: str = "",
) -> None:
    """Run the local bridge server until interrupted."""

    config = BridgeConfig(host=host, port=port, debug_port=debug_port, platform=platform, token=token)
    server = create_bridge_server(config)
    try:
        server.serve_forever()
    finally:
        server.server_close()


def _is_allowed_origin(origin: str) -> bool:
    return (
        origin.startswith("chrome-extension://")
        or origin.startswith("moz-extension://")
        or origin.startswith("http://localhost")
        or origin.startswith("http://127.0.0.1")
    )
