# Upwork Toolkit – Freelance Assistant

> **Chrome Extension (Manifest V3)** that helps Upwork freelancers find high-quality jobs faster and apply smarter.

⚠️ *Not affiliated with or endorsed by Upwork.*

---

## Features

### 🤖 AI Job Filtering (High-Quality Lead Finder)
- **Smart Scoring:** Uses OpenAI, Anthropic, or Google Gemini to automatically evaluate new jobs against strict criteria.
- **Red Flag Detection:** Automatically rejects low-quality clients, bad budgets, vague scope, and time-wasting posts.
- **Customizable Prompts:** Define your exact minimum fixed budget, hourly rate, client rating, client spend, and required niche directly in the UI.
- **Detailed Notifications:** Desktop alerts now include the AI's "Match Score" (1-10) and a brief reason why the job is a great fit.

### 🔔 Automated Job Alerts
- Save Upwork search URLs as "Search Profiles".
- The extension periodically checks for new jobs in the background (configurable from 1–10 minutes).
- Deduplication ensures you never receive multiple alerts for the same job.

### 📝 Proposal Auto-Fill
- Create and manage reusable cover letter templates categorized by tags.
- On Upwork proposal pages, your selected template is automatically filled into the cover letter field.
- Non-destructive: It only fills empty text areas and never overwrites your manual typing.

### 🎯 Feed Highlighting
- Define keyword and budget filters for the Upwork job feed.
- Matching jobs are highlighted with a green border and badge.
- Non-matching jobs are dimmed (but remain visible on hover) to reduce visual clutter.

---

## Installation

1. Clone or download this repository.
2. Open **Chrome** and navigate to `chrome://extensions`.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load Unpacked** and select the `upwork-agent` folder.
5. Click the extension icon in your toolbar to configure your settings.

---

## File Structure

```
upwork-agent/
├── background/            # Service worker (polling, notifications)
├── content/               # Content script (auto-fill, highlighting)
├── options/               # Options page (full settings)
├── popup/                 # Popup UI (quick toggles)
├── assets/icons/          # Extension icons
├── Docx/                  # Design documentation
└── manifest.json          # Extension manifest (MV3)
```

---

## Getting Started

1. **Add an AI Provider:** Go to Settings → AI Filtering. Enter your OpenAI or Anthropic API Key and toggle on "Enable AI Scoring".
2. **Add a Search Profile:** Go to Settings → Search Profiles and paste a URL from an Upwork search.
3. **Create a Template:** Go to Settings → Proposal Templates and write your default cover letter.
4. **Sit Back & Relax:** The extension will now silently monitor your searches, filter out the garbage using AI, and notify you only when top-tier jobs are posted.

---

## Upwork Safety & Compliance

This extension was heavily refactored to align with Upwork's strict automation and bot policies. You are responsible for using it in compliance with Upwork's Terms of Service.

- **Upwork Safe Mode (Default):** The extension uses idle detection to completely pause all background monitoring when you step away from your computer. 
- **Human-in-the-Loop:** It never auto-submits proposals. The Draft Assistant only pre-fills the text area for your review. You must manually click submit.
- **Randomized Jitter Polling:** Instead of fixed timers that look like scrapers, the extension uses exponential backoff and randomized long intervals (e.g., waiting a random time between 10 and 20 minutes) to emulate human-like feed checking.
- **No passwords collected:** Relies entirely on your existing active Upwork browser session.
- **Data stays local:** All settings, API keys, and templates are stored securely in your browser using `chrome.storage.sync`.

---

## License

MIT
