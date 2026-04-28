# Project Context for AI Agents

This document provides technical context and architectural details for the **Upwork Toolkit - Agent Edition** repository. Use this to quickly understand the codebase structure and development goals.

## Project History & Evolution
This project originated as a Node.js CLI tool utilizing Puppeteer to scrape Upwork jobs. Due to Cloudflare WAF challenges and session invalidation issues, it was **migrated to a Chrome Extension** (Manifest V3). This shift ensures persistent authentication by utilizing the user's active browser session and avoids bot detection.

## Directory Structure
- `upwork-toolkit-pro/`: The root directory of the unpacked Chrome Extension.
  - `manifest.json`: Configuration for Manifest V3. Defines permissions, background scripts, content scripts, and UI pages.
  - `background.js`: The service worker responsible for polling jobs (e.g., via `alarms`), checking licenses, and triggering notifications.
  - `options.html`: The main dashboard for the user to configure settings, define filtering parameters, and view the high-quality job feed.
  - `content-scripts/`: Scripts injected into Upwork pages (specifically `/nx/proposals/job/*/apply*`) for DOM interaction and proposal auto-filling.
  - `request_modifier.json`: `declarativeNetRequest` rules to intercept or modify network requests.
  - `assets/` & `chunks/`: Compiled assets (JS/CSS) indicating that this extension is likely bundled using a tool like Vite or WXT (based on file naming conventions).
- `docs/`: Durable migration documentation for future AI-agent sessions.
  - `MIGRATION_PLAN.md`: Step-by-step migration plan from compiled extension output to source.
  - `BASELINE.md`: Phase 0 baseline of current extension behavior, manifest, storage keys, alarms, and safety rules.
  - `APP_MAP.md`: Phase 1 map from compiled symbols/routes/storage/API clients to planned source modules.
  - `RECONSTRUCTION_LOG.md`: Session-by-session migration log and recovered symbol map.
  - `GRAPHQL_NOTES.md`: Running notes for GraphQL endpoint/request reconstruction.
  - `SCREENSHOT_CHECKLIST.md`: Required screenshots to capture from the real Chrome extension context.
  - `PHASE10_VERIFICATION.md`: Verification status and manual loaded-extension checklist for the reconstructed source build.
- `source/`: Reconstructed WXT/React/TypeScript source scaffold.
  - `entrypoints/background.ts`: MV3 background scaffold with alarm/action wiring.
  - `entrypoints/content.ts`: Proposal assistant content-script scaffold.
  - `entrypoints/options/`: Options HTML and React app scaffold.
  - `entrypoints/offscreen/`: Offscreen document and sound-message scaffold.
  - `src/`: Placeholder app routes, typed constants, storage/job types, and future GraphQL module boundaries.

## Core Functionality
1. **Job Scraping & Polling:** The background worker periodically fetches new jobs from Upwork's internal APIs.
2. **Filtering Logic:** Fetched jobs are scored against customizable parameters such as client history, budget constraints, and job clarity to identify high-conversion leads.
3. **UI Integration:** The user can interact with the extension via the `options.html` page, which contains the job feed cards and reactive configuration settings.
4. **Application Assistance:** The content scripts assist on the job application page, aiming to auto-fill or suggest proposal content.

## Development Guidelines
- **Frameworks/Build Tools:** The codebase contains compiled chunks (`_virtual_wxt-plugins-*.js`). It is highly probable that it was built using a framework like **WXT**. If source files (e.g., `.ts`, `.vue`, `.tsx`) are added in the future, ensure the build pipeline is maintained.
- **Manifest V3 Restrictions:** Keep in mind MV3 limitations. Use `chrome.alarms` for periodic tasks instead of `setInterval`. The background script must remain ephemeral.
- **Modifying UI:** Any changes to the UI should target the `options.html` or the framework components that compile into the `chunks/` directory.
- **Migration Rule:** For significant new work, do not keep expanding compiled chunks. Follow `docs/MIGRATION_PLAN.md` and rebuild source in a future `source/` project. Use direct chunk edits only as short-term hotfixes.
- **Baseline Safety:** Treat `upwork-toolkit-pro/` as the protected working baseline until source reconstruction can build an equivalent extension.

## Goals for Future Agents
When working on this codebase, your primary objectives might include:
- Optimizing the filtering algorithm for better job scoring.
- Enhancing the content script to improve the proposal auto-fill experience on Upwork.
- Improving the options UI to make settings more reactive and user-friendly.
- Handling potential errors in job fetching gracefully without crashing the service worker.

## Current Migration Status
- Phase 0, Baseline And Safety, has been documented in `docs/BASELINE.md`.
- Phase 1, Recover App Map From Bundle, has been documented in `docs/APP_MAP.md` and `docs/GRAPHQL_NOTES.md`.
- Phase 2, Scaffold New WXT Project, has been implemented in `source/`.
- Phase 3, Rebuild State And Storage, has been implemented in `source/`.
- Phase 4, Rebuild Jobs UI, has been implemented in `source/`.
- Phase 5, Rebuild Background Polling, has been implemented in `source/`.
- Phase 6, GraphQL Request Reconstruction, has been implemented in `source/`.
- Phase 7, AI Lead Filter Settings, has been implemented in `source/`.
- Phase 8, Gemini Ranking And Strict Filtering, has been implemented in `source/`.
- Phase 9, Content Script Migration, has been implemented in `source/`.
- Phase 10, Verification Workflow, has been added in `docs/PHASE10_VERIFICATION.md`; static source verification passes, while manual loaded-extension verification is pending.
- Several screenshots were captured in `docs/screenshots/`; remaining useful captures are listed in `docs/SCREENSHOT_CHECKLIST.md`.
- Next migration step is manual loaded-extension verification from `source/.output/chrome-mv3`.
