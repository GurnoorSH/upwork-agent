# Upwork Automation Workspace

A two-project workspace for automating Upwork job discovery, ranking, and proposal assistance.

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        This Workspace                            │
│                                                                  │
│  ┌─────────────────────┐         ┌──────────────────────────┐    │
│  │   upwork-agent/     │         │   chrome-agent/          │    │
│  │   Chrome Extension  │  HTTP   │   aigen-v2-core/         │    │
│  │   (WXT + React+TS)  │◄───────►│   Python Bridge Server   │    │
│  │                     │ :8787   │   (Selenium + Pydantic)  │    │
│  └──────┬──────────────┘         └────────┬─────────────────┘    │
│         │                                  │                     │
│         │ Upwork GraphQL                   │ Browser Automation  │
│         ▼                                  ▼                     │
│  ┌──────────────┐              ┌───────────────────────┐         │
│  │  Upwork.com  │              │  Gemini / ChatGPT /   │         │
│  │  (jobs API)  │              │  Claude / Perplexity  │         │
│  └──────────────┘              └───────────────────────┘         │
└──────────────────────────────────────────────────────────────────┘
```

### upwork-agent (Chrome Extension)

Monitors Upwork job feeds via GraphQL, filters and ranks jobs using AI, and assists with proposal writing. Built with WXT (Manifest V3), React, and TypeScript.

### chrome-agent (Python Bridge)

Local HTTP bridge server that sends job ranking prompts to logged-in AI platforms (Gemini, ChatGPT, Claude, Perplexity) through browser automation. No API keys needed — uses your existing browser sessions.

## Quick Start

### 1. Start Chrome with Remote Debugging

```powershell
# Windows (PowerShell)
$profile = "$env:LOCALAPPDATA\aigen-chrome-user-data"
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" "--remote-debugging-port=9222 --user-data-dir=""$profile"" --no-first-run --no-default-browser-check"

# Windows (Classic CMD)
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\aigen-chrome-user-data" --no-first-run --no-default-browser-check

# macOS
open -a "Google Chrome" --args --remote-debugging-port=9222
```

Chrome 136+ ignores `--remote-debugging-port` for the default Chrome user-data directory, including named profiles such as `Profile 16`. Use the non-default `aigen-chrome-user-data` directory above and log into your AI platform once there.

Log into your preferred AI platform (e.g., gemini.google.com) in that Chrome window.

### 2. Start the Bridge Server

```bash
cd chrome-agent/aigen-v2-core
pip install -e .
py -m aigen bridge --host 127.0.0.1 --port 8787 --debug-port 9222 --platform gemini
```

Verify it's running: `curl http://127.0.0.1:8787/health`

### 3. Build and Load the Extension

```bash
cd upwork-agent/source
npm install
npm run build
```

Then load the extension:
1. Go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `upwork-agent/source/.output/chrome-mv3`

### 4. Configure the Extension

1. Click the extension icon to open Options
2. Go to **AI lead filter**
3. Enable AI lead ranking
4. Set bridge URL to `http://127.0.0.1:8787`
5. Click **Check connection** to verify
6. Save settings

## Development

### Extension (upwork-agent)

```bash
cd upwork-agent/source
npm run dev          # Dev mode with hot reload
npm run typecheck    # Type checking
npm run build        # Production build
```

### Bridge (chrome-agent)

```bash
cd chrome-agent/aigen-v2-core
pip install -e .
py -m aigen bridge --port 8787 --platform gemini    # Start bridge
```

## Project Structure

```
Upwork/
├── upwork-agent/              # Chrome extension project
│   ├── source/                # WXT + React + TypeScript source
│   │   ├── entrypoints/       # Extension entry points
│   │   │   ├── background.ts  # Service worker (alarms, jobs, messages)
│   │   │   ├── content.ts     # Proposal assistant content script
│   │   │   ├── offscreen/     # Sound playback offscreen document
│   │   │   └── options/       # React options page
│   │   └── src/               # Application source
│   │       ├── ai/            # Bridge client, health check, ranking
│   │       ├── app/           # React UI (pages, layout, theme)
│   │       ├── background/    # Fetch cycle, alarms, scheduling
│   │       ├── content/       # Proposal assistant DOM logic
│   │       ├── graphql/       # Upwork API client
│   │       ├── jobs/          # Job types, components, storage
│   │       ├── logs/          # Logging utilities
│   │       ├── shared/        # Constants, messages, utilities
│   │       └── storage/       # Settings, migrations, state
│   ├── docs/                  # Active documentation
│   └── Docx/                  # AI agent context
├── chrome-agent/              # Python bridge project
│   └── aigen-v2-core/
│       ├── src/aigen/
│       │   ├── bridge/        # HTTP bridge server
│       │   ├── core/          # Browser client, driver, tab
│       │   ├── domains/       # Upwork ranking domain
│       │   ├── parsers/       # JSON extraction
│       │   └── ...            # Dataset generation (optional)
│       └── tests/             # Unit tests
└── start-bridge.bat           # One-command bridge launcher
```
