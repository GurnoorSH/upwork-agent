"""Tests for the local bridge HTTP server."""

from __future__ import annotations

import json
import threading
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from aigen.bridge.server import BridgeConfig, create_bridge_server
from aigen.core.browser_client import BrowserLLMResponse


class FakeLLMClient:
    def __init__(self, response_text: str, calls: list[dict]):
        self.response_text = response_text
        self.calls = calls

    def generate(self, prompt: str) -> BrowserLLMResponse:
        self.calls.append({"prompt": prompt})
        return BrowserLLMResponse(
            text=self.response_text,
            platform="gemini",
            tab_name="FAKE",
            duration_ms=12.5,
        )


def _start_server(response_text: str, token: str = ""):
    calls: list[dict] = []

    def factory(platform: str, debug_port: int, timeout_ms: int) -> FakeLLMClient:
        calls.append({"platform": platform, "debug_port": debug_port, "timeout_ms": timeout_ms})
        return FakeLLMClient(response_text, calls)

    server = create_bridge_server(
        BridgeConfig(host="127.0.0.1", port=0, debug_port=9333, platform="gemini", token=token),
        llm_client_factory=factory,
    )
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, calls


def _request(server, path: str, body=None, headers=None):
    url = f"http://127.0.0.1:{server.server_address[1]}{path}"
    data = None if body is None else json.dumps(body).encode("utf-8")
    request = Request(url, data=data, headers=headers or {}, method="GET" if body is None else "POST")
    if body is not None:
        request.add_header("Content-Type", "application/json")
    with urlopen(request, timeout=5) as response:
        return response.status, json.loads(response.read().decode("utf-8"))


def _shutdown(server):
    server.shutdown()
    server.server_close()


def _rank_body():
    return {
        "profilePrompt": "Prefer Chrome extension work.",
        "rankingPrompt": "Select strong leads.",
        "jobs": [
            {
                "jobId": "job-1",
                "title": "Build extension",
                "type": "Fixed-price",
                "budget": "$500",
                "description": "Build a Chrome extension with React.",
                "skills": ["React"],
                "client": {"paymentVerified": True},
            }
        ],
    }


def test_health_endpoint():
    server, _calls = _start_server('{"results": []}')
    try:
        status, body = _request(server, "/health")
    finally:
        _shutdown(server)

    assert status == 200
    assert body["status"] == "ok"
    assert body["platform"] == "gemini"
    assert body["debugPort"] == 9333


def test_rank_jobs_uses_fake_llm_and_returns_results():
    raw_response = json.dumps(
        {
            "results": [
                {
                    "jobId": "job-1",
                    "selected": True,
                    "score": 9,
                    "title": "Build extension",
                    "budget": "$500",
                    "clientSummary": "Verified",
                    "reasons": ["Good fit"],
                    "rejectionReason": None,
                }
            ]
        }
    )
    server, calls = _start_server(raw_response)
    try:
        status, body = _request(server, "/rank-jobs", _rank_body())
    finally:
        _shutdown(server)

    assert status == 200
    assert body["results"][0]["jobId"] == "job-1"
    assert body["results"][0]["selected"] is True
    assert body["meta"]["durationMs"] == 12.5
    assert body["meta"]["tabName"] == "FAKE"
    assert calls[0] == {"platform": "gemini", "debug_port": 9333, "timeout_ms": 180000}
    assert "Jobs to evaluate:" in calls[1]["prompt"]


def test_generate_json_returns_parsed_object():
    server, calls = _start_server('{"answer": 42}')
    try:
        status, body = _request(server, "/generate-json", {"prompt": "Return JSON"})
    finally:
        _shutdown(server)

    assert status == 200
    assert body["json"] == {"answer": 42}
    assert body["meta"]["tabName"] == "FAKE"
    assert calls[1]["prompt"] == "Return JSON"


def test_bridge_token_is_required_when_configured():
    server, _calls = _start_server('{"answer": 42}', token="secret")
    try:
        try:
            _request(server, "/generate-json", {"prompt": "Return JSON"})
        except HTTPError as exc:
            status = exc.code
            body = json.loads(exc.read().decode("utf-8"))
        else:
            raise AssertionError("Expected HTTPError")
    finally:
        _shutdown(server)

    assert status == 401
    assert body["error"] == "Invalid bridge token."


def test_bridge_token_accepts_valid_header():
    server, _calls = _start_server('{"answer": 42}', token="secret")
    try:
        status, body = _request(
            server,
            "/generate-json",
            {"prompt": "Return JSON"},
            headers={"X-Aigen-Bridge-Token": "secret"},
        )
    finally:
        _shutdown(server)

    assert status == 200
    assert body["json"]["answer"] == 42
