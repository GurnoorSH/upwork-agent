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

## Core Functionality
1. **Job Scraping & Polling:** The background worker periodically fetches new jobs from Upwork's internal APIs.
2. **Filtering Logic:** Fetched jobs are scored against customizable parameters such as client history, budget constraints, and job clarity to identify high-conversion leads.
3. **UI Integration:** The user can interact with the extension via the `options.html` page, which contains the job feed cards and reactive configuration settings.
4. **Application Assistance:** The content scripts assist on the job application page, aiming to auto-fill or suggest proposal content.

## Development Guidelines
- **Frameworks/Build Tools:** The codebase contains compiled chunks (`_virtual_wxt-plugins-*.js`). It is highly probable that it was built using a framework like **WXT**. If source files (e.g., `.ts`, `.vue`, `.tsx`) are added in the future, ensure the build pipeline is maintained.
- **Manifest V3 Restrictions:** Keep in mind MV3 limitations. Use `chrome.alarms` for periodic tasks instead of `setInterval`. The background script must remain ephemeral.
- **Modifying UI:** Any changes to the UI should target the `options.html` or the framework components that compile into the `chunks/` directory.

## Goals for Future Agents
When working on this codebase, your primary objectives might include:
- Optimizing the filtering algorithm for better job scoring.
- Enhancing the content script to improve the proposal auto-fill experience on Upwork.
- Improving the options UI to make settings more reactive and user-friendly.
- Handling potential errors in job fetching gracefully without crashing the service worker.
