# Project Context for AI Agents

This document provides technical context for the **Upwork Toolkit - Agent Edition** repository. Use this to quickly understand the codebase structure and development patterns.

## Project Overview

This is a Chrome Extension (Manifest V3) built with WXT, React, and TypeScript. It monitors Upwork job feeds, ranks jobs using AI, and assists with proposal writing.

**Key architectural decision:** Instead of using direct AI API keys (e.g., Gemini REST API), this extension calls a **local HTTP bridge** (`aigen-v2-core`) that automates browser-based AI platforms. This means:
- No API keys stored in the extension
- Uses the user's existing AI subscriptions via browser sessions
- Bridge runs at `http://127.0.0.1:8787` by default

## Directory Structure

- `source/`: WXT + React + TypeScript source code (the active codebase)
  - `entrypoints/background.ts`: MV3 background service worker — handles alarms, job fetching, message routing
  - `entrypoints/content.ts`: Content script for proposal assistance on Upwork apply pages
  - `entrypoints/options/`: React application entry point for the extension dashboard
  - `entrypoints/offscreen/`: Offscreen document for sound playback
  - `src/ai/`: Bridge client (`aigenBridgeClient.ts`), health check (`bridgeHealth.ts`), ranking types and prompts
  - `src/app/`: React UI — pages (Jobs, Filters, CoverLetter, Settings, Debug, Logs), layout, theme
  - `src/background/`: Fetch cycle orchestration, alarm setup, error classification, scheduling
  - `src/content/`: Proposal assistant DOM manipulation logic
  - `src/graphql/`: Upwork GraphQL API client with cookie-based authentication
  - `src/jobs/`: Job types, UI components (JobCard, JobList), formatters, storage
  - `src/logs/`: Shared safe logging (`safeLogger.ts`), instrumented fetch (`fetchWithLog.ts`)
  - `src/shared/`: Constants, message types, shared utilities (`utils.ts`)
  - `src/storage/`: AI filter settings, global state, storage keys, migrations
- `docs/`: Active verification documentation
- `docs/_archive/`: Historical migration-era documentation (Phases 0–9)
- `Docx/`: This context file

## Core Data Flow

1. **Background alarm** triggers `runFetchJobsCycle()` periodically
2. **Upwork GraphQL client** fetches jobs using cookie-based auth tokens
3. **Job ranker** sends candidates to the aigen bridge via `rankJobsWithAigen()`
4. **Bridge** (`POST /rank-jobs`) sends a prompt to a logged-in AI tab, parses JSON response
5. **Selected jobs** are merged with existing stored jobs and displayed in the Options UI
6. **Notifications** alert the user when new high-quality jobs are found

## Key Types

- `AiFilterSettings`: Bridge URL, token, platform, profile prompt, ranking prompt (in `src/ai/jobRankingTypes.ts`)
- `JobRankingResult`: Score, selected flag, reasons — returned by bridge (in `src/ai/jobRankingTypes.ts`)
- `Job`: Full Upwork job with optional `aiRanking` field (in `src/jobs/jobTypes.ts`)
- `GlobalState`: Extension state — enabled, feed type, dark mode, schedules (in `src/storage/globalState.ts`)

## Shared Utilities

The following modules contain shared code used across multiple files:
- `src/shared/utils.ts`: `toRecord()`, `toArray()`, `wait()` — type-safe casting helpers
- `src/logs/safeLogger.ts`: `safeAppendLog()` — logging that never throws
- `src/logs/fetchWithLog.ts`: `fetchWithRequestLog()` — instrumented fetch with request logging

## Development Guidelines

- **Build tool:** WXT (Vite-based). Run `npm run dev` for development, `npm run build` for production
- **TypeScript:** Strict mode. Run `npm run typecheck` to verify
- **MV3 restrictions:** Use `chrome.alarms` for periodic tasks, not `setInterval`. Background script is ephemeral
- **Logging:** Always use `safeAppendLog()` from `src/logs/safeLogger.ts` — never let logging break critical flows
- **Error handling:** Bridge failures should preserve the existing job feed, never crash the service worker
- **Storage:** Uses `@wxt-dev/storage` with migration functions for schema evolution

## Goals for Future Agents

- Add bridge status indicator on the Jobs page (currently only on Filters page)
- Implement platform failover in the bridge (try Gemini, then ChatGPT if configured)
- Add proposal auto-generation using the bridge's `/generate-json` endpoint
- Improve the content script with AI-powered cover letter drafting
- Add E2E integration tests for the bridge ↔ extension flow
