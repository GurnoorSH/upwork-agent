# Project Context

## What this project is

This repository is a command-line tool called `aigen-cli` for automating web-based AI generation workflows without using API keys. It uses a browser automation backend to control logged-in browser sessions on AI web platforms such as Gemini, ChatGPT, Claude, and Perplexity. The goal is to generate structured dataset outputs by sending batch prompts to these web interfaces, parsing model responses as JSON, validating them, deduplicating them, and writing them to files.

**It also includes an HTTP bridge server** that allows external applications (like the [Upwork Agent Chrome Extension](../../upwork-agent/)) to send ranking prompts through the same browser automation pipeline.

## Core behavior

1. `aigen init`
   - Runs an interactive wizard that creates a YAML configuration file (default `aigen.yaml`).
   - The config defines project metadata, generation target, batch size, platforms, schema, topic pool, output format, runtime settings, quality/compliance options, and optional source attachments.

2. `aigen generate -c aigen.yaml`
   - Loads and validates the YAML config using `src/aigen/core/engine.py`.
   - Optional overrides are applied from command-line arguments, including `--backend`, `--agents`, `--target`, and `--resume`.
   - If `--dry-run` is used, the CLI validates the config and prints the resolved settings without running generation.

3. `aigen bridge --port 8787 --platform gemini`
   - Starts a local HTTP bridge server at `http://127.0.0.1:8787`.
   - Exposes endpoints for external applications to use browser-based AI.
   - **Primary consumer:** The Upwork Agent Chrome Extension uses `POST /rank-jobs` to rank job candidates.
   - See [Bridge Server](#bridge-server) section below for full details.

4. Browser attachment
   - For Selenium mode, the engine attaches to a running Chrome instance using the remote debugging port (default `9222`) via `src/aigen/core/driver.py`.
   - It expects Chrome to already be running with `--remote-debugging-port=9222` and that the user has logged into the target AI platforms.
   - The driver connection is established by `attach_driver(port)`.

5. Session management
   - `src/aigen/core/session.py` manages browser login sessions by storing and loading cookies in JSON files under `sessions/`.
   - Sessions can be exported, imported, listed, or loaded into a live browser driver.

6. Generation engine
   - `src/aigen/core/engine.py` is the main execution engine.
   - It coordinates the following concerns:
     - Prompt generation through prompt templates.
     - Opening browser tabs and sending prompts to AI platforms.
     - Parsing response text as JSON arrays with `aigen.parsers.json_extract.extract_json_array`.
     - Validating output against schema rules via `aigen.validators.schema.SchemaValidator`.
     - Deduplicating generated items using `aigen.validators.dedup.DedupEngine` and optional semantic deduplication with `aigen.validators.semantic_dedup.SemanticDedup`.
     - Scoring quality via `aigen.validators.quality.QualityScorer`.
     - Detecting PII and tracking provenance via `aigen.validators.compliance.PIIDetector` and `ProvenanceTracker`.
     - Normalizing text and creating fingerprints for duplicate detection using `aigen.utils.normalize` and `aigen.utils.fingerprint`.
     - Writing results to output files in JSON, CSV, or JSONL format using writer classes in `src/aigen/output/`.
     - Optional HuggingFace dataset push via `src/aigen/output/hf_push.py`.

7. Output and resume
   - Completed generation results are written to the configured output directory and filename.
   - The engine supports resume behavior, allowing interrupted runs to continue from existing output.
   - Raw responses and audit trails are preserved so the exact output can be reviewed.

## Bridge Server

The bridge server (`src/aigen/bridge/server.py`) provides an HTTP API that allows external applications to use browser-based AI without managing browser automation themselves.

### Startup

```bash
aigen bridge --host 127.0.0.1 --port 8787 --debug-port 9222 --platform gemini
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Returns `{"status": "ok", "platform": "gemini", "service": "aigen-bridge"}` |
| `POST` | `/generate-json` | Generic JSON generation: send a prompt, get structured JSON back |
| `POST` | `/rank-jobs` | Upwork-specific: ranks job candidates and returns `UpworkRankingResponse` |

### `/rank-jobs` Request/Response Contract

**Request** (`UpworkRankingRequest`):
```json
{
  "jobs": [
    {
      "jobId": "~01abc...",
      "title": "React Developer Needed",
      "type": "Fixed-price",
      "budget": "$500",
      "description": "...",
      "proposals": "5 to 10",
      "connects": 12,
      "skills": ["React", "TypeScript"],
      "client": {
        "paymentVerified": true,
        "rating": 4.8,
        "spend": 50000,
        "hires": 25,
        "postedJobs": 40,
        "country": "US"
      }
    }
  ],
  "profilePrompt": "Shopify / UI UX / Figma...",
  "rankingPrompt": "Evaluate the following jobs...",
  "platform": "gemini"
}
```

**Response** (`UpworkRankingResponse`):
```json
{
  "results": [
    {
      "jobId": "~01abc...",
      "selected": true,
      "score": 8,
      "title": "React Developer Needed",
      "budget": "$500",
      "clientSummary": "Verified, high-spend US client",
      "reasons": ["Good budget", "Verified client", "Matches skills"],
      "rejectionReason": null
    }
  ]
}
```

### CORS & Security

- Bound to `127.0.0.1` (localhost only)
- CORS allows `chrome-extension://`, `moz-extension://`, `http://localhost`, `http://127.0.0.1`
- Optional `X-Aigen-Bridge-Token` header for authentication

### Integration with Upwork Agent

The Chrome extension calls `POST /rank-jobs` from its background service worker via `src/ai/aigenBridgeClient.ts`. The bridge:
1. Receives the job list and prompt
2. Builds a composite prompt using `src/aigen/domains/upwork.py`
3. Sends it to the AI tab via `BrowserLLMClient.generate()`
4. Parses the response as `UpworkRankingResult[]` using strict Pydantic schemas
5. Returns the structured results to the extension

## Configuration and execution flow

- Config file is loaded by `load_config(path)` in `src/aigen/core/engine.py`.
- Configuration validation is performed by `validate_generation_config(cfg)`.
- The engine is instantiated with `GenerationEngine(cfg, debug_port=debug_port, agents=agents, resume=resume, backend=backend)`.
- The CLI command `generate` drives the engine via `engine.run()`.
- Errors are caught by the CLI and flush output to disk before exiting on interrupt.

## What the project does not do currently

- It does not require official model API access; instead it automates the web UI.
- It relies on a running browser instance with remote debugging enabled.
- It does not fully implement headless Playwright backend yet in the visible files, but the CLI supports switching `--backend playwright` if configured.

## Key files and modules

- `src/aigen/cli/main.py` — Main CLI definition and command wiring.
- `src/aigen/core/engine.py` — Core generation engine, config validation, orchestration, and output handling.
- `src/aigen/core/browser_client.py` — `BrowserLLMClient` for sending prompts and reading responses from AI tabs.
- `src/aigen/core/driver.py` — Attaches Selenium to Chrome remote debugging.
- `src/aigen/core/session.py` — Session/cookie management.
- `src/aigen/bridge/server.py` — HTTP bridge server for external integration.
- `src/aigen/domains/upwork.py` — Upwork ranking prompt builder and response parser.
- `src/aigen/parsers/json_extract.py` — Parses raw AI responses into JSON.
- `src/aigen/validators/` — Schema validation, deduplication, quality scoring, compliance.
- `src/aigen/output/` — Writers for JSON, CSV, JSONL, and HuggingFace pushing.

## How subsequent AI agents should use this context

Use this context as the authoritative description of the repository's intended workflow and architecture. The repository serves two primary use cases:

1. **CLI dataset generation:** A CLI-driven browser automation engine that takes a YAML configuration, attaches to a logged-in browser, sends batch prompts to web AI platforms, parses and validates the returned JSON, deduplicates and scores the data, and writes structured dataset outputs.

2. **HTTP bridge for external apps:** A lightweight HTTP server that exposes the same browser automation capabilities to external applications (primarily the Upwork Agent Chrome Extension) via REST endpoints. The bridge handles CORS, prompt construction, response parsing, and error handling for the caller.
