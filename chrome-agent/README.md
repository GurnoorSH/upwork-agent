# aigen-cli

**Zero-API, browser-based AI generation toolkit.**

Turn any web AI (Gemini, ChatGPT, Claude, Perplexity) into a batch generation engine. No API keys. No costs. No lock-in. Just your browser and a CLI.

```
$20/mo subscription → unlimited generations
vs
$0.001-$0.024 per API call → $4.80 for 200 items
```

---

## Quick Start

### 1. Install

```bash
pip install -e .
```

### 2. Start Chrome with debugging

```bash
google-chrome --remote-debugging-port=9222
# or on macOS:
open -a "Google Chrome" --args --remote-debugging-port=9222
```

### 3. Log into your AI platforms

Open `gemini.google.com`, `chatgpt.com`, or `claude.ai` in that Chrome instance.

### 4. Create a config

```bash
aigen init
```

This launches an interactive wizard.

### 5. Generate

```bash
aigen generate -c aigen.yaml
```

---

## Commands

| Command | Description |
|---------|-------------|
| `aigen init` | Interactive config wizard |
| `aigen generate` | Run generation job |
| `aigen sessions` | Manage browser sessions |
| `aigen status` | Show generation status |

---

## Config File Format (YAML)

```yaml
project: "My Dataset"
description: "Description of what we're generating"
target: 100              # Total items to generate
batch_size: 5            # Items per request
agents: 2                # Parallel browser tabs
platforms:               # AI platforms to use
  - gemini
  - chatgpt
mode: batch              # Generation mode

schema:
  fields: [field1, field2, ...]
  required: [field1, field2]

topic_pool:
  - chapter: "Chapter Name"
    topic: "Sub-topic"
    question_type: short_answer
    difficulty: easy
    marks: 3

output:
  format: json           # json, csv, or jsonl
  path: output
  filename: dataset.json
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      aigen-cli                           │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Gemini   │  │ ChatGPT  │  │  Claude  │  │Perplexity│ │
│  │  Tab     │  │   Tab    │  │   Tab    │  │   Tab    │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │
│       │              │             │              │       │
│       └──────────────┴─────────────┴──────────────┘       │
│                          │                                │
│              ┌───────────▼───────────┐                    │
│              │    BrowserTab (tab.py) │                   │
│              │   Platform-agnostic    │                   │
│              └───────────┬───────────┘                    │
│                          │                                │
│              ┌───────────▼───────────┐                    │
│              │  GenerationEngine     │                    │
│              │  (engine.py)          │                    │
│              └───────────┬───────────┘                    │
│                          │                                │
│    ┌─────────────────────┼─────────────────────┐         │
│    │                     │                     │         │
│ ┌──▼──┐  ┌───────────┐ ┌▼────────┐  ┌────────▼──┐     │
│ │Parse│  │  Validate  │ │ Dedup   │  │  Output   │     │
│ │JSON │  │  (schema)  │ │ Engine  │  │ Writers   │     │
│ └─────┘  └───────────┘ └─────────┘  └───────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## Features

### ✅ Current (v0.1)
- **Multi-platform support**: Gemini, ChatGPT, Claude, Perplexity
- **Parallel agents**: Multiple browser tabs working simultaneously
- **Batch generation**: Send prompts, receive batched JSON responses
- **Configurable schema**: Define any output schema via YAML
- **Topic pool**: Cycle through topics with weighted distribution
- **Deduplication**: Fingerprint-based duplicate detection
- **Repair fallback**: Auto-reprompt on parse failures
- **Resume capability**: Continue interrupted runs
- **Multiple output formats**: JSON, CSV, JSONL
- **Full audit trail**: Raw responses saved for every batch
- **Interactive wizard**: `aigen init` guides configuration

### 🚧 Planned (v0.2)
- **Playwright backend**: Headless mode without Chrome debugging
- **Iterative mode**: One-at-a-time with quality feedback
- **Adversarial mode**: Generate → Critique → Regenerate
- **Cookie management**: Save/load login sessions
- **Live TUI**: Rich progress bars and statistics
- **HuggingFace push**: Direct upload to datasets

### 🔮 Future (v1.0)
- **Web dashboard**: FastAPI + React for visual monitoring
- **MCP server**: Expose generation as an MCP tool
- **Community templates**: Share configs, schemas, prompts
- **Cost estimator**: "You saved $X vs API pricing"

---

## Why This Exists

**The problem**: API costs scale linearly with usage. Generating 1000 dataset items via API can cost $20-50. The same models via web interface are included in a flat $20/month subscription.

**The solution**: Automate the web interface through Selenium. You get:
- **Unlimited** generations (rate-limited only by the platform's anti-bot, not billing)
- **Zero API keys** — just log in normally
- **Full transparency** — every raw response is saved
- **No vendor lock-in** — swap platforms instantly via config

---

## License

MIT
