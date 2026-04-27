# Upwork Toolkit - Context & Architecture

This document provides context and architectural decisions for AI agents interacting with or extending this codebase.

## Project Overview
The Upwork Toolkit is a Chrome Extension (Manifest V3) designed to assist freelancers by automating job discovery, filtering high-quality leads, highlighting the job feed, and auto-filling cover letter proposals.

It aims to bypass the limitations of Upwork's native RSS feeds and API restrictions by interacting directly with the DOM and leveraging the authenticated user's active session.

## Core Architecture

### 1. Service Worker (`background.js`)
- Handles periodic polling of "Search Profiles" using `chrome.alarms` (min 1-minute interval).
- **Job Fetching Strategy:** First attempts to message an active Upwork tab (`content.js`) to scrape the DOM. If no tab is open or responsive, it falls back to a direct `fetch()` of the search URL.
- **AI Filtering Pipeline:** If AI is enabled, it takes unseen jobs, bundles them, and makes a direct HTTP call to an LLM provider (OpenAI, Anthropic, or Gemini) using the configured system prompt. 
- **State Management:** Manages `lastSeenIds` (limited to 500 to prevent `chrome.storage` bloat) to ensure notifications are only sent for strictly unseen jobs. Sends desktop notifications via `chrome.notifications`.

### 2. Content Script (`content.js`)
- Injected into `https://www.upwork.com/*`.
- **Scraping:** Navigates the complex, heavily-nested React DOM of Upwork. Extracts critical job data: Title, Budget, Description, Skills, Payment Verification, Client Rating, Client Spend, and Job Type.
- **Feed Highlighting:** Listens to DOM mutations to style job cards in real-time. Highlights jobs matching keyword/budget criteria green, and dims irrelevant ones.
- **Auto-Fill:** Detects proposal textareas and automatically injects the selected cover letter template, triggering native `input` events to bypass React's synthetic event trapping.

### 3. Options UI (`options.html`, `options.js`)
- A vanilla JavaScript, multi-tab single-page application.
- Uses `chrome.storage.sync` to persist user configurations across devices.
- **Modules:**
  - **Search Profiles:** User-defined Upwork search URLs.
  - **Proposal Templates:** Saved cover letters.
  - **Feed Filters:** Simple keyword/budget rules for the DOM highlighter.
  - **AI Filtering:** Stores API keys, tunable prompt parameters (budget, rating thresholds), and the main System Prompt.

## Key Decisions & Constraints

- **No Puppeteer/External Node Scripts:** The project migrated away from a Node.js CLI/Puppeteer architecture to a pure Chrome Extension to seamlessly piggyback on the user's logged-in Chrome profile. This circumvents Cloudflare WAF and Upwork bot-detection issues.
- **No Native Frameworks:** The UI is built using vanilla HTML/CSS/JS to keep the extension lightweight and avoid bundling complexities.
- **AI Integration Design:** The prompt dictates strict quality guidelines ("High-Quality Lead Finder"). To enable this, `content.js` explicitly scrapes the client's historical data (Spend/Rating), which is then serialized and sent to the LLM. The LLM must return a structured JSON response identifying the job ID, match score, and reasoning.
- **Error Handling on AI Failure:** If the AI API fails or returns malformed JSON, the `background.js` gracefully falls back to returning the original list of jobs rather than swallowing errors, ensuring the user doesn't miss alerts.
