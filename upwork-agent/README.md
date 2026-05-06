# Upwork Toolkit - Agent Edition

A Chrome Extension (Manifest V3) that automates Upwork job discovery and application assistance. Uses a local AI bridge to rank jobs without API keys.

## Key Features

- **Job Monitoring:** Background service worker fetches new jobs periodically via Upwork's GraphQL API
- **AI Lead Ranking:** Sends job candidates to a local [aigen bridge](../chrome-agent/aigen-v2-core/) that uses browser-based AI (Gemini, ChatGPT, Claude, Perplexity) for scoring
- **Proposal Assistance:** Content script injects a cover letter drafting tool on Upwork proposal pages
- **Bridge Health Check:** Filters page shows real-time bridge connection status
- **Smart Filtering:** Deterministic pre-filters reject obviously low-quality jobs before AI ranking
- **Notifications:** System notifications when high-quality jobs are found

## Architecture

```
Extension (this project)
├── Background Service Worker
│   ├── Alarm-driven fetch cycles
│   ├── Upwork GraphQL client (cookie-based auth)
│   ├── AI ranking via aigen bridge (HTTP localhost)
│   └── Job merge, storage, badge, notifications
├── Options Page (React + MUI)
│   ├── Jobs feed with cards and scores
│   ├── AI filter settings (bridge URL, token, platform, prompts)
│   ├── Cover letter template
│   ├── Settings (schedule, sound, dark mode)
│   └── Debug & logs
├── Content Script
│   └── Proposal assistant (cover letter drafting dialog)
└── Offscreen Document
    └── Sound playback
```

## Development

```bash
cd source
npm install
npm run dev          # Dev mode with hot reload
npm run typecheck    # Type checking
npm run build        # Production build
```

## Loading the Extension

1. Run `npm run build` to generate `.output/chrome-mv3`
2. Go to `chrome://extensions/` and enable Developer mode
3. Click **Load unpacked** → select `source/.output/chrome-mv3`
4. Pin the extension and click its icon to open Options

## AI Ranking Setup

This extension uses a **local aigen bridge** instead of direct API keys:

1. Start Chrome with `--remote-debugging-port=9222`
2. Log into your preferred AI platform (Gemini, ChatGPT, etc.)
3. Start the bridge: `aigen bridge --port 8787 --platform gemini`
4. In the extension's Filters page, enable AI ranking and set the bridge URL
5. Click **Check connection** to verify the bridge is online

See [chrome-agent/aigen-v2-core](../chrome-agent/aigen-v2-core/) for bridge setup details.

## Project Structure

```
source/
├── entrypoints/           # WXT entry points
│   ├── background.ts      # Service worker
│   ├── content.ts         # Proposal assistant
│   ├── offscreen/         # Sound playback
│   └── options/           # React app entry
└── src/
    ├── ai/                # Bridge client, health check, ranking types
    ├── app/               # React pages and layout
    ├── background/        # Fetch cycle, alarms, scheduling
    ├── content/           # Proposal assistant DOM logic
    ├── coverLetter/       # Cover letter storage
    ├── graphql/           # Upwork API client and queries
    ├── jobs/              # Job types, components, formatters
    ├── logs/              # Safe logging, fetch instrumentation
    ├── notifications/     # Chrome notifications
    ├── shared/            # Constants, messages, utilities
    ├── storage/           # Settings, migrations, global state
    └── styles/            # Global CSS
```
