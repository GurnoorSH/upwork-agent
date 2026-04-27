# Upwork Toolkit Clone – Technical Design and Working Details

This document explains **how an “Upwork toolkit – your own freelance assistant” style Chrome extension works** and specifies everything your agent needs to recreate and extend it.

The design is inferred from the public Chrome Web Store listing and similar Upwork job‑assistant extensions (job alerts, proposal helpers, AI assistants). [web:4][web:6][web:7][web:19]

---

## 1. Product Overview

### 1.1 Problem

Freelancers on Upwork waste time repeatedly refreshing the job feed, manually skimming for relevant jobs, and rewriting similar cover letters from scratch for each proposal. Being early and consistent is crucial to winning jobs, but doing this manually is tedious.

### 1.2 Solution

A Chrome extension that acts as a **freelance assistant** by:

- Monitoring Upwork job searches in the background and detecting new matching jobs in real time. [web:4][web:6][web:7][web:19]
- Sending notifications when new, relevant jobs appear, so the freelancer can apply quickly. [web:4][web:5][web:7]
- Assisting with proposals by **auto-filling cover letters** using stored templates or AI-generated drafts. [web:4][web:6][web:8][web:19]
- Optionally highlighting or hiding jobs in the feed based on user-defined rules.

The user experience: “focus on your work, get instant job alerts, and apply first with pre-populated cover letters.” [web:4][web:6]

---

## 2. High-Level Architecture

The extension is built as a **Chrome Manifest V3** extension with these components:

1. **Manifest (manifest.json)**
   - Declares permissions, content scripts, background service worker, options page, and popup.

2. **Background Service Worker (background.js)**
   - Periodically checks one or more Upwork search URLs or communicates with content scripts in Upwork tabs.
   - Parses job listings, filters them according to user rules, deduplicates by job ID, and triggers notifications. [web:7][web:19]

3. **Content Scripts**
   - Injected into Upwork pages.
   - On job feed pages: read and optionally style job cards (highlight/hide) based on filters. [web:2][web:10]
   - On proposal pages: detect the cover-letter textarea and auto-fill it with stored or AI-generated text. [web:4][web:6][web:8][web:19]

4. **Options Page (options.html / options.js)**
   - UI for configuring search URLs, filters, proposal templates, and feature toggles.

5. **Popup (popup.html / popup.js)**
   - Quick overview and simple toggles (enable/disable alerts, auto-fill, etc.).

6. **Storage**
   - Uses `chrome.storage.sync` or `chrome.storage.local` to persist:
     - Search definitions (Upwork URLs).
     - Filter rules (keywords, budget, client rating, etc.).
     - Proposal templates and preferences.
     - Last seen job IDs per search, to avoid duplicate alerts.

7. **(Optional) Backend / AI Service**
   - For advanced versions, a backend provides AI proposal generation and analytics.
   - The extension calls this backend with job description + profile data, receives a proposal draft, and injects it via content scripts. [web:7][web:19][web:23][web:24]

---

## 3. User-Facing Features

### 3.1 Job Alerts

- User saves one or more Upwork search URLs (e.g., filtered by category, budget, keywords).
- Extension periodically checks these URLs (or scrapes open Upwork tab) and detects newly posted jobs.
- When a new job matches user-defined filters, it sends a desktop notification with title, budget, and a link to the job. [web:4][web:5][web:7][web:19]

### 3.2 Proposal Auto-Fill

- On the Upwork proposal page, the extension finds the cover-letter textarea.
- If empty, it auto-fills it with:
  - A selected static template **or**
  - AI-generated text based on the job description and stored user info.
- It triggers an `input` event so Upwork’s own form logic recognizes the text.

### 3.3 Job Highlighting / Filtering on Feed

- On the job feed or search results page, content scripts:
  - Inspect each job card’s title, description, tags, budget, and client stats.
  - Apply CSS styles to highlight “good” jobs and dim/hide irrelevant ones.
- This behavior mirrors other extensions that style jobs based on rules. [web:2][web:10]

### 3.4 Configuration UI

- Options page provides forms for:
  - Adding/editing **search profiles** (URLs + filters).
  - Defining **keywords**, min/max budgets, client rating thresholds, etc.
  - Creating and managing multiple **cover-letter templates**.
  - Enabling/disabling autofill and job highlighting.

---

## 4. Manifest and Permissions (Manifest V3)

### 4.1 Example manifest.json

```json
{
  "manifest_version": 3,
  "name": "Upwork Toolkit – Freelance Assistant (Clone)",
  "version": "0.1.0",
  "description": "Job alerts + proposal assistant for Upwork.",
  "permissions": ["storage", "notifications", "alarms", "scripting"],
  "host_permissions": ["https://www.upwork.com/*"],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["https://www.upwork.com/*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "options_page": "options.html",
  "action": {
    "default_popup": "popup.html"
  }
}
```

Reasoning:

- `notifications` – to show desktop alerts about new jobs. [web:4][web:5][web:7]
- `alarms` – to schedule periodic polling of job feeds.
- `scripting` and `host_permissions` – to inject and run scripts on Upwork pages.
- `storage` – to store user filters, templates, and last seen jobs.

---

## 5. Background Worker – Job Polling and Alert Logic

### 5.1 Responsibilities

- Maintain a periodic job via `chrome.alarms` (e.g., every 1–2 minutes).
- For each configured search profile:
  - Retrieve its Upwork search URL and filter settings.
  - Fetch the search page HTML (or request the active Upwork tab to provide DOM data).
  - Extract job posting info: job ID, title, description snippet, budget, client stats, post time.
  - Filter jobs using user rules.
  - Compare job IDs against stored last-seen IDs and keep only new ones.
  - Send notifications and update last-seen IDs in storage. [web:7][web:19]

### 5.2 Alarm Setup (background.js)

```js
const CHECK_INTERVAL_MIN = 1; // 1 minute – configurable

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('check-upwork-jobs', {
    periodInMinutes: CHECK_INTERVAL_MIN
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'check-upwork-jobs') {
    checkAllSearchProfiles();
  }
});
```

### 5.3 Checking All Search Profiles

```js
async function checkAllSearchProfiles() {
  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');

  for (const profile of searchProfiles) {
    await checkSingleProfile(profile);
  }
}
```

### 5.4 Fetch and Parse Jobs

Two options:

1. **Direct fetch in background** (if CORS and authentication allow):
   - Use `fetch(profile.url, { credentials: 'include' })`.
   - Parse the returned HTML with `DOMParser`.

2. **Ask a content script in an Upwork tab**:
   - Send a message via `chrome.tabs.sendMessage`.
   - Content script reads the DOM and returns job data.

Pseudo-code (direct fetch version):

```js
async function checkSingleProfile(profile) {
  const { lastSeenIds = {} } = await chrome.storage.sync.get('lastSeenIds');
  const profileLastIds = lastSeenIds[profile.id] || [];

  const res = await fetch(profile.url, { credentials: 'include' });
  const html = await res.text();

  const jobs = parseJobsFromHtml(html);

  const filtered = filterJobs(jobs, profile.filters);
  const unseen = filtered.filter(j => !profileLastIds.includes(j.id));

  if (unseen.length) {
    await sendJobNotifications(unseen, profile);
    lastSeenIds[profile.id] = Array.from(new Set([...profileLastIds, ...unseen.map(j => j.id)]));
    await chrome.storage.sync.set({ lastSeenIds });
  }
}
```

`parseJobsFromHtml` and `filterJobs` are implementation-specific and need to be updated as Upwork’s HTML changes.

### 5.5 Job Notifications

```js
async function sendJobNotifications(jobs, profile) {
  for (const job of jobs) {
    await chrome.notifications.create(job.id, {
      type: 'basic',
      iconUrl: 'icon128.png',
      title: job.title,
      message: `${job.budget} – ${job.shortDescription}`,
      priority: 2
    });
  }
}

chrome.notifications.onClicked.addListener((notifId) => {
  // Assuming notifId == job.id
  const jobUrl = `https://www.upwork.com/jobs/${notifId}`;
  chrome.tabs.create({ url: jobUrl });
});
```

This provides the “instant job alerts” and quick access to job postings described by toolkit-style extensions. [web:4][web:5][web:7][web:19]

---

## 6. Content Scripts – Proposal Auto-Fill

### 6.1 Responsibilities

- Detect when the user is on a job proposal page.
- Locate the cover-letter textarea.
- Load the selected proposal template (or generate via AI using background communication).
- Insert the text only when the field is empty to avoid clobbering manual edits.

### 6.2 Basic Auto-Fill Logic (content.js)

```js
async function autoFillCoverLetter() {
  const textarea = document.querySelector(
    'textarea[name="cover_letter"], textarea[aria-label*="Cover letter"]'
  );

  if (!textarea) return;

  const { templates = [], selectedTemplateId, autoFillEnabled = true } =
    await chrome.storage.sync.get(['templates', 'selectedTemplateId', 'autoFillEnabled']);

  if (!autoFillEnabled) return;

  const template = templates.find(t => t.id === selectedTemplateId);
  if (!template) return;

  if (!textarea.value.trim()) {
    textarea.value = template.body;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

const observer = new MutationObserver(() => {
  autoFillCoverLetter();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
```

This implementation remains client-side and deterministic, similar to extensions that let users save and reuse cover-letter templates on Upwork. [web:8]

### 6.3 AI-Generated Proposals (Optional)

For an AI mode comparable to newer assistant toolkits: [web:7][web:19][web:23][web:24]

- Content script gathers:
  - Job description text.
  - Basic freelancer info (name, title, top skills).
- Sends a message to the background worker.
- Background worker calls your backend API, which uses an LLM to generate a proposal.
- Background sends the generated text back and content script injects it into the textarea.

The exact API design is up to you, but keep keys and rate limits on the backend, not hard-coded in the extension.

---

## 7. Content Scripts – Job Feed Highlighting

### 7.1 Responsibilities

- On Upwork job feed/search pages:
  - Identify each job card element via stable selectors.
  - Extract data: title, description snippet, skills/tags, budget, client rating, location.
  - Evaluate against user-defined rules.
  - Apply CSS to visually highlight or dim/hide jobs.

### 7.2 Example Logic

```js
async function styleJobFeed() {
  const { feedFilters = {} } = await chrome.storage.sync.get('feedFilters');
  const { keywords = [], minBudget } = feedFilters;

  const cards = document.querySelectorAll('[data-test="job-tile-list"] article');

  cards.forEach(card => {
    const title = card.querySelector('a[data-test="job-title"]')?.innerText || '';
    const desc = card.querySelector('[data-test="job-description"]')?.innerText || '';
    const text = (title + ' ' + desc).toLowerCase();

    const matchesKeyword = !keywords.length || keywords.some(kw => text.includes(kw.toLowerCase()));

    // Example: budget extraction – needs adaptation to Upwork's markup
    const budgetText = card.textContent || '';
    const budget = extractBudget(budgetText);

    const passesBudget = !minBudget || (budget && budget >= minBudget);

    if (!matchesKeyword || !passesBudget) {
      card.style.opacity = '0.3';
      card.style.filter = 'grayscale(1)';
    } else {
      card.style.border = '2px solid #4caf50';
    }
  });
}

const feedObserver = new MutationObserver(() => styleJobFeed());
feedObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});
```

This is conceptually similar to other Upwork toolkits that “apply styling based on your rules to exclude jobs you don’t normally apply to.” [web:2][web:10]

---

## 8. Options Page – Configuration

### 8.1 Data Structures

Examples stored in `chrome.storage.sync`:

```ts
interface SearchProfile {
  id: string;
  name: string;
  url: string; // Upwork search URL
  filters: {
    keywords: string[];
    minBudget?: number;
    maxBudget?: number;
    hourly?: boolean;
    fixedPrice?: boolean;
    minClientRating?: number;
    paymentVerifiedOnly?: boolean;
    locations?: string[];
  };
}

interface ProposalTemplate {
  id: string;
  name: string;
  body: string;
  categoryTags?: string[]; // e.g. "React", "Shopify"
}

interface Settings {
  searchProfiles: SearchProfile[];
  templates: ProposalTemplate[];
  selectedTemplateId?: string;
  autoFillEnabled: boolean;
  jobAlertsEnabled: boolean;
  feedFilters: {
    keywords: string[];
    minBudget?: number;
  };
}
```

### 8.2 Options UI Elements

- **Search Profiles**
  - Table/list of profiles with add/edit/delete.
  - For each: name, Upwork search URL, filters.

- **Proposal Templates**
  - Multi-line textareas to define template body.
  - Optional tags/categories to pick templates automatically by job type.

- **Global Settings**
  - Toggles for job alerts, auto-fill, and feed highlighting.
  - Polling interval selection (e.g., 1, 2, 5 minutes).

Similar extensions expose such controls to let users tune alerts and proposal behavior. [web:2][web:8][web:19]

---

## 9. Security, Compliance, and Upwork Policies

Upwork’s own guidance on Chrome extensions emphasizes that freelancers must understand how an extension works, what data it collects, and how it might affect their account or violate policies. [web:9]

### 9.1 Key Principles

- **No password collection.**
  - The extension should rely on the existing Upwork login session; it must not ask for or store user passwords.

- **No automatic spamming.**
  - Avoid auto-submitting proposals without explicit user action; keep the assistant supportive (alerts, auto-fill), not fully autonomous.

- **Clear data use.**
  - If you send data to a backend (e.g., for AI), clearly document what is sent (job text, profile metadata) and what is stored.

- **Branding & Disclaimer.**
  - State clearly in the description: **“Not affiliated with or endorsed by Upwork.”** [web:4][web:6][web:13]

- **Rate Limits & Performance.**
  - Poll at reasonable intervals to avoid loading Upwork’s servers aggressively.

---

## 10. Implementation Roadmap for the Agent

### Phase 1 – Basic Proposal Auto-Fill

- Implement Manifest V3 skeleton with content script.
- Build options page for managing a single template.
- On proposal pages, auto-fill cover letter if empty.

### Phase 2 – Job Feed Highlighting

- Extend content script to detect feed pages and style job cards.
- Add filter configuration for keywords and budgets.

### Phase 3 – Background Job Alerts

- Implement background service worker with `chrome.alarms`.
- Add search profile management (URLs + filters) in options.
- Implement job polling, parsing, filtering, deduplication.
- Implement Chrome notifications and click handling.

### Phase 4 – AI Assistance (Optional)

- Build a small backend service that exposes an API endpoint for proposal generation.
- Use LLM to generate proposals from job description + user profile data.
- Integrate “Generate with AI” button on proposal pages.
- Add configuration for API usage (e.g., toggle AI mode).

This roadmap mirrors the progressive capabilities of existing Upwork toolkits and similar extensions in the market. [web:4][web:6][web:7][web:19]

---

## 11. Deliverables Checklist

For a first shippable version, your agent should provide:

- [ ] Manifest V3 Chrome extension with background service worker and content script.
- [ ] Options page (HTML/CSS/JS) for configuring search profiles, filters, and templates.
- [ ] Popup for quick on/off toggles and status.
- [ ] Background job polling + notifications.
- [ ] Proposal page auto-fill based on stored templates.
- [ ] Job feed highlighting based on filters.
- [ ] Clear README and in-extension help text explaining behavior, data usage, and limitations.

Optional advanced deliverables:

- [ ] AI backend service for proposal generation.
- [ ] Client/job scoring logic.
- [ ] Analytics dashboard (e.g., number of alerts, proposals, win rate).

With this spec, a competent frontend/extension developer can build a working clone of an “Upwork toolkit – freelance assistant” style Chrome extension and iterate on it as needed.
