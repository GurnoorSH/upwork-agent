# Upwork Job Scoring Agent — Project Context

## What This Tool Does

A Node.js CLI tool that automates the process of finding and evaluating Upwork job listings for freelance bidding. It runs three stages:

1. **Search Scrape** — Scrapes Upwork's job search page using Puppeteer (connected to the user's real Chrome session) to extract job listings
2. **Enrichment** — Visits each job page to extract client quality signals (spend history, hire rate, ratings, proposals count) from the `__NEXT_DATA__` JSON blob
3. **AI Scoring** — Sends enriched job data to Google Gemini, which scores each job 1-10 and provides a BID/MAYBE/SKIP verdict with reasons and a proposal opener

## Architecture

```
index.mjs          ← orchestrator: fetch → enrich → filter → score → display
  ├── config.mjs   ← user preferences (keywords, filters, profile, scoring)
  ├── rss.mjs      ← Puppeteer-based scraper (name kept for backward compat)
  ├── scraper.mjs  ← job page fetching, __NEXT_DATA__ extraction, field mapping
  └── scorer.mjs   ← Gemini API integration, prompt engineering, JSON parsing
```

### Data Flow

```
Upwork Search Page (SPA, scraped via Puppeteer)
  → parse job cards from DOM → [{title, link, pubDate, description}]
  → fetch each job page (sequential, 2.5s delay)
  → extract __NEXT_DATA__ JSON → client signals
  → hard filter (budget, proposals)
  → send to Gemini with scoring rules
  → [{score, verdict, reasons, redFlags, proposalOpener}]
  → formatted terminal output
```

## What Changed (v2.0.0) — RSS → Puppeteer Refactor

### Problem
Upwork killed their RSS feed endpoint (`/ab/feed/jobs/rss`) in Aug 2024. It returns HTTP 410 Gone. The old `rss.mjs` used `node-fetch` + `fast-xml-parser` to consume this feed — completely broken.

### What We Tried & Failed
1. **Headless Puppeteer with stealth plugin** — Launched a fresh headless Chrome via `puppeteer-extra` + `puppeteer-extra-plugin-stealth`. Cloudflare blocked it immediately. The stealth plugin alone is NOT enough — Cloudflare Enterprise detects headless fingerprints, missing cookies/sessions, and bot-like TLS signatures.

### What Works Now (Chrome Extension Approach)
Learned from how Chrome extensions bypass Cloudflare: they run inside the user's **real browser session** which is already trusted by Cloudflare.

`rss.mjs` now has **two modes**:

| Mode | How to Use | When |
|------|-----------|------|
| **Connect** (default) | Start Chrome with `chrome.exe --remote-debugging-port=9222`, then run the scraper | Best for daily use — reuses your session, no challenges |
| **Launch** (`--launch` flag) | `node index.mjs --dry-run --launch` | Launches headed Chrome with persistent `.chrome-profile/` dir. May need to solve Cloudflare on first run |

Both modes detect Cloudflare's "Just a moment..." page and wait up to 120s for the user to solve it.

### Current Status (2026-04-24)
- ✅ `rss.mjs` rewritten — Puppeteer-based, connects to user's Chrome
- ✅ `index.mjs` updated — `--dry-run` and `--launch` flags added
- ✅ `package.json` updated — added `puppeteer`, `puppeteer-extra`, `puppeteer-extra-plugin-stealth`; removed `fast-xml-parser`
- ✅ `npm run dry-run` works — scraped 10 jobs successfully with `--launch` mode
- ⚠️ Enrichment returned 0/10 enriched — `scraper.mjs` fetches job pages via plain `node-fetch` which may also be getting blocked by Cloudflare. This is the **next problem to solve**.
- ❌ Full scoring pipeline untested (blocked on enrichment)

### DOM Selectors (extracted 2026-04-24)

These are in the `SELECTORS` object at the top of `rss.mjs`:

| Purpose | Selector | Stability |
|---------|----------|-----------|
| Job list container | `[data-test="JobsList"]` | 🟢 Stable |
| Job card | `[data-test="JobTile"]` | 🟢 Stable |
| Title link | `a[data-test="job-tile-title-link UpLink"]` | 🟡 Medium |
| Published date | `[data-test="job-pubilshed-date"]` | 🟢 Stable (Upwork's own typo) |
| Description | `p.text-body-sm` | 🔴 Fragile (class-based) |

If selectors break, run `Docx/dom-inspector.js` in browser DevTools on the search page.

## Key Design Decisions

### Google Gemini
User preference. Using `@google/generative-ai` SDK with `gemini-2.0-flash` model. The `.env` file holds `GOOGLE_API_KEY`.

### Sequential Enrichment
Job pages are fetched one at a time with a 2.5-second delay between requests to avoid rate limiting from Upwork. No `Promise.all()`.

### Defensive __NEXT_DATA__ Parsing
Upwork's internal JSON structure can change. The scraper tries multiple paths for each field using optional chaining (`?.`) and falls back gracefully — if extraction fails, the job is flagged `enriched: false` and still passed to the scorer with RSS-only data.

### Dual Extraction Strategy
1. **Regex** — fast first attempt for `__NEXT_DATA__` script tag
2. **Cheerio** — HTML parser fallback if regex fails

### Hard Filters Applied Before Scoring
Jobs below `minBudget` or above `maxProposals` are dropped before hitting the API, saving tokens/cost.

## File Descriptions

| File | Purpose |
|------|---------|
| `index.mjs` | Entry point — orchestrates the full pipeline, prints formatted results |
| `config.mjs` | User configuration — keywords, job type, budget, profile, scoring criteria |
| `rss.mjs` | Puppeteer-based search page scraper (replaces dead RSS). Connects to user's Chrome or launches headed browser |
| `scraper.mjs` | Fetches job pages, extracts client signals from `__NEXT_DATA__` |
| `scorer.mjs` | Sends jobs to Gemini with structured prompt, parses scored JSON response |
| `.env` | `GOOGLE_API_KEY` (not committed to git) |
| `.chrome-profile/` | Persistent Chrome profile for `--launch` mode (auto-created, gitignored) |
| `Docx/context.md` | This file — project architecture, history, and design notes |
| `Docx/dom-inspector.js` | DevTools script — paste into console on Upwork search page to discover current selectors |
| `Docx/TaskList.md` | Task tracking and change log |

## Configuration Reference

Edit `config.mjs` to customize:

- **keywords** — search terms joined with `+` in the search query
- **jobType** — `"fixed"`, `"hourly"`, or `"both"`
- **minBudget** — USD threshold; jobs below this are filtered out
- **maxProposals** — competition threshold; jobs above this are filtered out
- **preferredCountries** — client countries that get a scoring bonus
- **myProfile** — your freelancer description (used in Gemini prompt)
- **scoringCriteria** — natural language instructions for how Gemini should score

## Running the Tool

**Repository**: `https://github.com/GurnoorSH/upwork-agent.git`

```bash
# 1. Install dependencies
npm install

# 2. Add your Google API key to .env
#    GOOGLE_API_KEY=your_actual_key

# 3. Customize config.mjs with your keywords and profile

# 4. Start Chrome with remote debugging (recommended)
chrome.exe --remote-debugging-port=9222

# 5. Run (dry-run skips Gemini scoring)
npm run dry-run          # test pipeline without Gemini
npm start                # full run with scoring

# Alternative: launch a separate browser
node index.mjs --dry-run --launch
```

## Scoring Rules (enforced in prompt)

| Condition | Effect |
|-----------|--------|
| Score ≥ 7 | Verdict = BID |
| Score 5-6 | Verdict = MAYBE |
| Score < 5 | Verdict = SKIP |
| Client $0 spent | Score capped at 4 |
| Proposals > 20 | -2 points |
| Preferred country | +1 point |
| Budget < minBudget | Forced SKIP |

## Known Issues / Next Steps

1. **Enrichment blocked** — `scraper.mjs` uses plain `node-fetch` to fetch individual job pages. Likely also being blocked by Cloudflare. Needs same Puppeteer treatment or session cookie forwarding.
2. **Cloudflare fragility** — Even with persistent profiles, Cloudflare may re-challenge. No automated CAPTCHA solving; user must intervene.
3. **Selector maintenance** — Upwork obfuscates CSS classes and may change `data-test` attributes at any time. Keep `Docx/dom-inspector.js` handy.
