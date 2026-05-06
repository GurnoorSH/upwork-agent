# aigen-v2-core to Upwork Agent Bridge Plan

Date: 2026-05-02

## Goal

Refactor `aigen-v2-core` from a dataset-training/batch-generation CLI into a local browser-backed AI bridge that the Upwork agent can call instead of storing or using a Gemini API key.

The target flow is:

1. User starts Chrome with remote debugging and logs into Gemini/ChatGPT/Claude normally.
2. User starts a local `aigen` bridge service.
3. The Upwork extension fetches Upwork jobs as it does today.
4. The extension sends candidate jobs to `aigen` over localhost.
5. `aigen` sends the ranking prompt to a logged-in web AI tab, parses strict JSON, and returns `JobRankingResult[]`.
6. The extension stores and displays selected jobs exactly as it currently does after Gemini API ranking.

This keeps the Upwork agent free of provider API keys while reusing the user's logged-in web AI sessions.

## Current State Read

### aigen-v2-core

Relevant project files inspected:

- `README.md`
- `context.md`
- `pyproject.toml`
- `src/aigen/cli/main.py`
- `src/aigen/core/engine.py`
- `src/aigen/core/driver.py`
- `src/aigen/core/session.py`
- `src/aigen/core/tab.py`
- `src/aigen/core/playwright_pool.py`
- `src/aigen/mcp_server.py`
- `src/aigen/parsers/json_extract.py`
- `src/aigen/prompts/templates.py`
- `src/aigen/validators/schema.py`
- file tree under `src/aigen/output`, `src/aigen/validators`, `src/aigen/utils`, and tests

What matters:

- `GenerationEngine` is currently optimized for dataset creation from YAML: target count, batch size, topic pool, schema validation, deduping, output writers, audit trails, and HuggingFace push.
- Browser automation is already useful and lives mostly in `BrowserTab` plus `attach_driver`.
- The existing `mcp_server.py` is not directly useful for the browser extension because Chrome extensions cannot speak stdio MCP. It is still useful as a pattern for exposing a programmatic tool.
- The Playwright backend exists, but Selenium remote-debug Chrome is the safest first integration because it can use the user's already logged-in normal browser profile.

### upwork-agent

Relevant project files inspected:

- `docs/APP_MAP.md`
- `source/package.json`
- `source/entrypoints/background.ts`
- `source/src/background/fetchJobsCycle.ts`
- `source/src/ai/geminiClient.ts`
- `source/src/ai/jobRanker.ts`
- `source/src/ai/jobRankingTypes.ts`
- `source/src/storage/aiFilterSettings.ts`
- `source/src/storage/migrations.ts`
- `source/src/app/pages/FiltersPage.tsx`
- `source/src/app/pages/SettingsPage.tsx`

What matters:

- The Upwork agent currently calls Gemini REST API in `source/src/ai/geminiClient.ts`.
- API key gating is in `shouldSkipAiRanking()` in `source/src/ai/jobRanker.ts`.
- The settings UI asks for a "Gemini API key" in `source/src/app/pages/FiltersPage.tsx`.
- `fetchJobsCycle.ts` catches `GeminiApiError` and logs Gemini-specific messages.
- The desired bridge should preserve the `JobRankingResult` shape so the job merge, storage, UI, and notification behavior need minimal change.

Generated/build/dependency folders such as `node_modules`, `.output`, `.wxt`, and egg-info should not drive architecture decisions.

## Proposed Architecture

Add a local HTTP bridge to `aigen-v2-core`.

Why HTTP instead of MCP:

- The Upwork agent is a Chrome extension background service worker.
- It can `fetch()` localhost with host permissions.
- It cannot directly use stdio MCP.
- HTTP keeps the integration simple, debuggable, and testable.

Recommended local API:

```text
GET  http://127.0.0.1:8787/health
POST http://127.0.0.1:8787/rank-jobs
POST http://127.0.0.1:8787/generate-json
```

`/rank-jobs` should be the first production endpoint.

Request:

```json
{
  "profilePrompt": "User niche/profile text",
  "rankingPrompt": "Ranking instructions",
  "jobs": [
    {
      "jobId": "stable-id",
      "title": "Job title",
      "type": "Hourly",
      "budget": "$20-$40/hr",
      "description": "Job description",
      "proposals": "Less than 5",
      "connects": 12,
      "skills": ["React", "Chrome Extension"],
      "client": {
        "paymentVerified": true,
        "rating": 4.9,
        "spend": 10000,
        "hires": 20,
        "postedJobs": 50,
        "country": "United States"
      }
    }
  ],
  "platform": "gemini",
  "debugPort": 9222,
  "timeoutMs": 180000
}
```

Response:

```json
{
  "results": [
    {
      "jobId": "stable-id",
      "selected": true,
      "score": 9,
      "title": "Job title",
      "budget": "$20-$40/hr",
      "clientSummary": "Payment verified, strong spend history",
      "reasons": ["Strong fit", "Clear scope"],
      "rejectionReason": null
    }
  ],
  "meta": {
    "platform": "gemini",
    "durationMs": 42000,
    "rawResponsePath": "optional-debug-path"
  }
}
```

The extension can unwrap `results` and continue using existing ranking logic.

## Refactor Phases

### Phase 1: Extract reusable browser LLM primitives

Status: implemented on 2026-05-02.

Owner files:

- `src/aigen/core/tab.py`
- `src/aigen/core/driver.py`
- new `src/aigen/core/browser_client.py`
- new `tests/test_browser_client.py`

Tasks:

- Keep `BrowserTab` focused on browser UI operations: focus, send, receive, upload.
- Add a small `BrowserLLMClient` wrapper that owns:
  - attaching to Chrome
  - selecting or opening the right platform tab
  - sending one prompt
  - returning raw text plus metadata
- Avoid pulling dataset concepts into this client.
- Add a fake tab/driver test path so prompt send/parse behavior can be tested without live Chrome.

Acceptance:

- Dataset generation still works.
- A unit test can call a fake `BrowserLLMClient.generate(prompt)` and receive deterministic text.

Implementation notes:

- Added `BrowserLLMClient` and `BrowserLLMResponse` in `src/aigen/core/browser_client.py`.
- The client lazily attaches to Chrome, reuses an existing platform tab when possible, opens a platform tab when needed, sends one prompt, and returns raw text plus metadata.
- Selenium imports are lazy so domain/server tests can import the client without browser dependencies installed.
- Added fake-driver tests in `tests/test_browser_client.py`.
- Verification run used the bundled Python because `python` and `pytest` were not on PATH:

```bash
$env:PYTHONPATH='src'; C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -c "from tests.test_browser_client import test_browser_llm_client_reuses_existing_platform_tab, test_browser_llm_client_opens_platform_tab_when_missing, test_browser_llm_client_attaches_lazily; test_browser_llm_client_reuses_existing_platform_tab(); test_browser_llm_client_opens_platform_tab_when_missing(); test_browser_llm_client_attaches_lazily(); print('browser client tests passed')"
C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m py_compile src\aigen\core\browser_client.py tests\test_browser_client.py
```

Full `pytest` was not run because `pytest` is not installed in the available Python environment.

### Phase 2: Add strict JSON helpers for objects and arrays

Status: implemented on 2026-05-02.

Owner files:

- `src/aigen/parsers/json_extract.py`
- new or updated parser tests

Tasks:

- Keep `extract_json_array(text)` for dataset mode.
- Add `extract_json_object(text)` for bridge responses shaped like `{ "results": [...] }`.
- Add tolerant parsing for fenced JSON and largest balanced object block.
- Do not accept non-JSON prose as success.

Acceptance:

- Tests cover direct JSON, fenced JSON, noisy wrapper text, malformed text, and object containing `results`.

Implementation notes:

- Generalized balanced-block scanning in `src/aigen/parsers/json_extract.py` for both arrays and objects.
- Kept `extract_json_array(text)` behavior for dataset mode.
- Added `extract_json_object(text)` for bridge responses such as `{ "results": [...] }`.
- Object extraction rejects valid non-object JSON such as a top-level array instead of scavenging inner objects.
- Expanded `tests/test_parsers.py` for direct objects, fenced objects, noisy wrappers, malformed input, multiple objects, and braces inside strings.
- Verification run used the bundled Python because `pytest` is still unavailable:

```bash
$env:PYTHONPATH='src'; C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -c "import tests.test_parsers as t; [getattr(t, name)() for name in dir(t) if name.startswith('test_')]; print('parser tests passed')"
C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m py_compile src\aigen\parsers\json_extract.py tests\test_parsers.py
```

Full `pytest` was not run because `pytest` is not installed in the available Python environment.

### Phase 3: Add Upwork ranking domain module

Status: implemented on 2026-05-02.

Owner files:

- new `src/aigen/domains/upwork.py`
- new `tests/test_upwork_domain.py`

Tasks:

- Define Pydantic models for:
  - `UpworkRankingJob`
  - `UpworkRankingRequest`
  - `UpworkRankingResult`
  - `UpworkRankingResponse`
- Build a ranking prompt equivalent to `source/src/ai/geminiClient.ts::buildRankingPrompt`.
- Require the web AI to return:

```json
{
  "results": [
    {
      "jobId": "...",
      "selected": true,
      "score": 8,
      "title": "...",
      "budget": "...",
      "clientSummary": "...",
      "reasons": ["...", "..."],
      "rejectionReason": null
    }
  ]
}
```

- Validate:
  - every result has a known `jobId`
  - `score` is clamped to `1..10`
  - `reasons` is at most 3 strings
  - missing jobs become rejected or are retried once

Acceptance:

- Given sample jobs, prompt output is stable.
- Given messy model JSON, parser returns normalized `UpworkRankingResult` objects.

Implementation notes:

- Added `src/aigen/domains/__init__.py` and `src/aigen/domains/upwork.py`.
- Added Pydantic v2 models:
  - `UpworkClientInfo`
  - `UpworkRankingJob`
  - `UpworkRankingRequest`
  - `UpworkRankingResult`
  - `UpworkRankingMeta`
  - `UpworkRankingResponse`
- Added `build_upwork_ranking_prompt(request)` mirroring the current extension prompt shape from `source/src/ai/geminiClient.ts`.
- Added `parse_upwork_ranking_response(raw_text, request)` using `extract_json_object`.
- Response normalization:
  - skips unknown `jobId` results and records them in metadata
  - clamps numeric scores to `1..10`, with invalid scores as `0`
  - limits reasons to 3 strings
  - fills missing model results as rejected jobs with `rejectionReason="Model response omitted this job."`
- Added `tests/test_upwork_domain.py` for prompt content, noisy JSON parsing, score/reason normalization, unknown job skipping, missing-job rejection, and invalid response errors.
- Verification run used the bundled Python because `pytest` is still unavailable:

```bash
$env:PYTHONPATH='src'; C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -c "import tests.test_upwork_domain as t; [getattr(t, name)() for name in dir(t) if name.startswith('test_')]; print('upwork domain tests passed')"
$env:PYTHONPATH='src'; C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -c "import tests.test_browser_client as b, tests.test_parsers as p, tests.test_upwork_domain as u; [getattr(b, name)() for name in dir(b) if name.startswith('test_')]; [getattr(p, name)() for name in dir(p) if name.startswith('test_')]; [getattr(u, name)() for name in dir(u) if name.startswith('test_')]; print('phase 1-3 direct tests passed')"
C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m py_compile src\aigen\domains\__init__.py src\aigen\domains\upwork.py tests\test_upwork_domain.py
```

Full `pytest` was not run because `pytest` is not installed in the available Python environment.

### Phase 4: Add local bridge server

Status: implemented on 2026-05-02.

Owner files:

- `pyproject.toml`
- `requirements.txt`
- new `src/aigen/bridge/server.py`
- update `src/aigen/cli/main.py`
- new tests for request/response model validation

Tasks:

- Add FastAPI/Uvicorn or a minimal standard-library HTTP server.
- Recommended dependencies: `fastapi`, `uvicorn`.
- Add CLI command:

```bash
aigen bridge --host 127.0.0.1 --port 8787 --debug-port 9222 --platform gemini
```

- Implement:
  - `GET /health`
  - `POST /rank-jobs`
  - `POST /generate-json` as a generic future endpoint
- Add CORS for extension use. Keep it narrow:
  - allow `chrome-extension://*` during development, or
  - allow configured extension ID later.
- Optional but recommended: local shared token header, e.g. `X-Aigen-Bridge-Token`, stored in extension settings.

Acceptance:

- `curl http://127.0.0.1:8787/health` returns healthy JSON.
- `POST /rank-jobs` can be tested with a fake LLM client without launching Chrome.
- Live mode works when Chrome is running with `--remote-debugging-port=9222` and Gemini is open/logged in.

Implementation notes:

- Implemented with Python standard-library `http.server.ThreadingHTTPServer` instead of FastAPI/Uvicorn, so no new dependencies were needed.
- Added `src/aigen/bridge/__init__.py` and `src/aigen/bridge/server.py`.
- Added CLI command in `src/aigen/cli/main.py`:

```bash
aigen bridge --host 127.0.0.1 --port 8787 --debug-port 9222 --platform gemini
```

- Endpoints:
  - `GET /health`
  - `POST /rank-jobs`
  - `POST /generate-json`
  - `OPTIONS *` for CORS preflight
- CORS allows extension and local development origins:
  - `chrome-extension://*`
  - `moz-extension://*`
  - `http://localhost*`
  - `http://127.0.0.1*`
- Optional shared token is supported with `--token`; requests must include `X-Aigen-Bridge-Token`.
- `POST /rank-jobs` builds the Upwork prompt, calls `BrowserLLMClient`, parses with the Upwork domain adapter, and returns `results` plus metadata.
- `POST /generate-json` is a generic prompt-to-JSON-object endpoint for later use.
- Added `tests/test_bridge_server.py` using a real local server on port `0` and a fake LLM client, so it does not launch Chrome.
- Verification run used the bundled Python because `pytest` is still unavailable:

```bash
$env:PYTHONPATH='src'; C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -c "import tests.test_bridge_server as t; [getattr(t, name)() for name in dir(t) if name.startswith('test_')]; print('bridge server tests passed')"
$env:PYTHONPATH='src'; C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -c "import tests.test_browser_client as b, tests.test_parsers as p, tests.test_upwork_domain as u, tests.test_bridge_server as s; [getattr(b, name)() for name in dir(b) if name.startswith('test_')]; [getattr(p, name)() for name in dir(p) if name.startswith('test_')]; [getattr(u, name)() for name in dir(u) if name.startswith('test_')]; [getattr(s, name)() for name in dir(s) if name.startswith('test_')]; print('phase 1-4 direct tests passed')"
C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m py_compile src\aigen\bridge\__init__.py src\aigen\bridge\server.py src\aigen\cli\main.py tests\test_bridge_server.py
```

Full `pytest` was not run because `pytest` is not installed in the available Python environment.

### Phase 5: Update Upwork extension settings

Status: implemented on 2026-05-02.

Owner files:

- `source/src/ai/jobRankingTypes.ts`
- `source/src/storage/aiFilterSettings.ts`
- `source/src/storage/migrations.ts`
- `source/src/app/pages/FiltersPage.tsx`
- `source/wxt.config.ts`

Tasks:

- Replace `apiKey`-centric settings with bridge settings while preserving migrations for old users.
- Suggested type:

```ts
export type AiFilterSettings = {
  enabled: boolean;
  provider: "aigen-local";
  bridgeUrl: string;
  bridgeToken: string;
  platform: "gemini" | "chatgpt" | "claude" | "perplexity";
  model: string;
  profilePrompt: string;
  rankingPrompt: string;
};
```

- Default `bridgeUrl` to `http://127.0.0.1:8787`.
- Keep `model` optional/backward-compatible even if the browser bridge does not use it yet.
- Update UI labels:
  - "Enable AI lead ranking"
  - "Local aigen bridge URL"
  - "Bridge token"
  - "Web AI platform"
- Remove "Gemini API key" language.
- Add localhost host permission in WXT config:

```ts
"http://127.0.0.1/*",
"http://localhost/*"
```

Acceptance:

- Existing saved settings migrate without crashing.
- The Filters page no longer asks for a provider API key.

Implementation notes:

- Updated Upwork extension files under `C:\Users\gurno\Desktop\Upwork\upwork-agent\source`.
- Added bridge settings to `source/src/ai/jobRankingTypes.ts`:
  - `provider: "aigen-local"`
  - `bridgeUrl`
  - `bridgeToken`
  - `platform`
- Kept `apiKey: string` as a deprecated compatibility field only because Phase 6 has not yet removed `source/src/ai/geminiClient.ts`; removing it now would break TypeScript before the client swap.
- Added bridge defaults in `source/src/storage/aiFilterSettings.ts`:
  - `bridgeUrl: "http://127.0.0.1:8787"`
  - `platform: "gemini"`
- Updated `source/src/storage/migrations.ts` so old stored settings migrate into the new bridge shape while preserving old `apiKey` internally until Phase 6.
- Updated `source/src/app/pages/FiltersPage.tsx`:
  - removed the visible Gemini API key field
  - changed labels to local aigen bridge language
  - added bridge URL, bridge token, and web AI platform controls
  - left model as an optional metadata label for now
- Updated `source/wxt.config.ts` host permissions:
  - `http://127.0.0.1/*`
  - `http://localhost/*`
- Verification:

```bash
cd C:\Users\gurno\Desktop\Upwork\upwork-agent\source
npm run typecheck
npm run build
```

Both commands passed. The production build emitted the existing WXT/Vite chunk-size warning for the options bundle.

### Phase 6: Replace Gemini REST client with aigen bridge client

Status: implemented on 2026-05-02.

Owner files:

- replace or rename `source/src/ai/geminiClient.ts`
- `source/src/ai/jobRanker.ts`
- `source/src/background/fetchJobsCycle.ts`
- logs/request logging tests if present

Tasks:

- Create `source/src/ai/aigenBridgeClient.ts`.
- Export `AigenBridgeError`, equivalent to the current `GeminiApiError` role.
- Implement `rankJobsWithAigen(settings, input)`.
- Send the same `JobRankingInput` data currently sent to Gemini.
- Parse `response.results`.
- Reuse existing `parseRankingResult` behavior where possible.
- Update `shouldSkipAiRanking()` to check:
  - `settings.enabled`
  - non-empty `settings.bridgeUrl`
  - no API key requirement
- Update logs from Gemini-specific wording to provider-neutral wording:
  - "AI ranking completed."
  - "AI ranking failed; preserved previous jobs feed."
  - "Aigen bridge unavailable."

Acceptance:

- Typecheck passes.
- Fetch cycle behavior remains the same when the bridge succeeds.
- If bridge is unavailable, previous stored feed is preserved and a clear log is written.

Implementation notes:

- Updated Upwork extension files under `C:\Users\gurno\Desktop\Upwork\upwork-agent\source`.
- Added `source/src/ai/aigenBridgeClient.ts`.
- Deleted `source/src/ai/geminiClient.ts`.
- Updated `source/src/ai/jobRanker.ts`:
  - imports `rankJobsWithAigen`
  - skips ranking only when disabled or `bridgeUrl` is blank
  - logs provider-neutral AI ranking messages
- Updated `source/src/background/fetchJobsCycle.ts`:
  - imports `AigenBridgeError`
  - logs bridge status instead of Gemini rate-limit/API status
  - preserves the previous stored feed on bridge/ranking failure
- Removed `apiKey` from `AiFilterSettings`, defaults, migrations, and Filters save/reset flow.
- Updated `source/src/app/pages/DebugPage.tsx` to mask `bridgeToken` instead of the old API key.
- Removed `https://generativelanguage.googleapis.com/*` from extension host permissions.
- Final search showed no active `GeminiApiError`, `rankJobsWithGemini`, `apiKey`, `generativelanguage`, or `geminiClient` references.
- Verification:

```bash
cd C:\Users\gurno\Desktop\Upwork\upwork-agent\source
npm run typecheck
npm run build
```

Both commands passed. The production build emitted the existing WXT/Vite chunk-size warning for the options bundle.

### Phase 7: Manual integration verification

Steps:

1. Install `aigen-v2-core` editable:

```bash
cd C:\Users\gurno\Desktop\Upwork\chrome-agent\aigen-v2-core
pip install -e .
```

2. Start Chrome with remote debugging:

```bash
chrome.exe --remote-debugging-port=9222
```

3. Open Gemini in that Chrome profile and confirm the user is logged in.
4. Start the bridge:

```bash
aigen bridge --host 127.0.0.1 --port 8787 --debug-port 9222 --platform gemini
```

5. In `upwork-agent/source`, run:

```bash
npm run typecheck
npm run build
```

6. Load the built extension in Chrome.
7. In the extension Filters page:
  - enable AI lead ranking
  - set bridge URL to `http://127.0.0.1:8787`
  - set platform to `gemini`
8. Trigger a fetch cycle.
9. Confirm:
  - jobs are fetched from Upwork
  - candidate jobs are sent to localhost
  - Gemini web UI receives a prompt
  - selected jobs are stored with `aiRanking`
  - rejected jobs stay hidden
  - logs show provider-neutral success/failure messages

## Important Constraints

- Do not make the Chrome extension spawn Python directly in the first pass. MV3 service workers are a poor fit for process management. Manual bridge startup is acceptable for v1.
- Do not keep the Gemini API client as the default path after the bridge lands. It can remain as a legacy fallback only if explicitly configured.
- Do not let dataset-specific concepts leak into the Upwork ranking endpoint: no `target`, `topic_pool`, output writers, HuggingFace push, or dataset schema validation in `/rank-jobs`.
- Keep localhost binding defaulted to `127.0.0.1`, not `0.0.0.0`.
- Save raw model responses only under an `aigen` output/debug directory, never in the extension.
- Avoid logging full job descriptions in extension logs unless debug mode explicitly asks for it.

## Future Enhancements

- Native Messaging host so the extension can start/stop the bridge.
- Bridge status indicator in the Filters page.
- Platform failover: try Gemini, then ChatGPT or Claude if configured.
- Persistent browser session profiles managed by `aigen sessions`.
- Queueing and cancellation so overlapping Upwork fetch cycles do not pile up browser prompts.
- A small desktop tray or TUI showing connected platform, last request, and health.

## Suggested First Commit

The most useful first implementation commit should be narrow:

1. Add `BrowserLLMClient`.
2. Add `extract_json_object`.
3. Add `domains/upwork.py` with prompt building and response validation.
4. Add a fake-client `POST /rank-jobs` path and tests.

Only after that should the Upwork extension be changed to call the bridge.
