# Upwork Toolkit – Freelance Assistant

> **Chrome Extension (Manifest V3)** that helps Upwork freelancers find jobs faster and apply smarter.

⚠️ *Not affiliated with or endorsed by Upwork.*

---

## Features

### 🔔 Job Alerts
- Save Upwork search URLs as "search profiles"
- Extension polls for new jobs on a configurable interval (1–10 min)
- Desktop notifications with job title, budget, and one-click link
- Deduplication ensures you never get alerted twice for the same job

### 📝 Proposal Auto-Fill
- Create and manage reusable cover letter templates
- On Upwork proposal pages, the selected template is automatically filled in
- Only fills empty textareas — never overwrites your manual edits
- Triggers Upwork's `input` event so the form recognizes the text

### 🎯 Feed Highlighting
- Define keyword and budget filters
- Matching jobs get a green highlight border + ★ badge
- Non-matching jobs are dimmed (but still visible on hover)
- Styling is applied in real time as new jobs load

### ⚙️ Configuration
- **Search Profiles** — add/edit/delete with per-profile filters
- **Proposal Templates** — manage multiple templates with category tags
- **Feed Filters** — keyword + budget rules for highlighting
- **General Settings** — polling interval, export/import, reset

---

## Installation

1. Clone or download this repository
2. Open **Chrome** → navigate to `chrome://extensions`
3. Enable **Developer Mode** (toggle in top-right)
4. Click **Load Unpacked** → select the `upwork-agent` folder
5. The extension icon appears in your toolbar — click it to configure

---

## File Structure

```
upwork-agent/
├── manifest.json          # Extension manifest (MV3)
├── background.js          # Service worker (polling, notifications)
├── content.js             # Content script (auto-fill, highlighting)
├── content-styles.css     # Injected styles for job cards
├── popup.html/css/js      # Popup UI (quick toggles)
├── options.html/css/js    # Options page (full settings)
├── icons/                 # Extension icons
└── Docx/                  # Design documentation
```

---

## Getting Started

1. **Add a Search Profile** — Go to Settings → Search Profiles → paste an Upwork search URL
2. **Create a Template** — Go to Settings → Proposal Templates → write your cover letter
3. **Enable Alerts** — Toggle on via the popup
4. **Browse Upwork** — Jobs matching your filters are highlighted; proposals are auto-filled

---

## Security & Compliance

- **No passwords collected** — relies on your existing Upwork login session
- **No auto-submission** — proposals are filled but never submitted automatically
- **Data stays local** — all settings stored in `chrome.storage.sync`
- **Reasonable polling** — minimum 1-minute interval to respect Upwork's servers

---

## Tech Stack

- Chrome Extension Manifest V3
- Vanilla JavaScript (no frameworks)
- `chrome.storage.sync` / `chrome.storage.local`
- `chrome.alarms` for periodic background checks
- `chrome.notifications` for desktop alerts
- Content scripts for DOM manipulation on Upwork pages

---

## License

MIT
