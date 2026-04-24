# Upwork Job Scoring Agent — Project Context

## What This Tool Does

A Node.js CLI tool that automates the process of finding and evaluating Upwork job listings for freelance bidding. It runs three stages:

1. **Search Scrape** — Scrapes Upwork's job search page using Puppeteer (connected to the user's real Chrome session) to extract job listings
2. **Enrichment** — Visits each job page to extract client quality signals (spend history, hire rate, ratings, proposals count) from the `__NEXT_DATA__` JSON blob
3. **AI Scoring** — Sends enriched job data to Google Gemini, which scores each job 1-10 and provides a BID/MAYBE/SKIP verdict with reasons and a proposal opener

## Architecture

```
index.mjs          ← orchestrator: fetch → enrich → filter → score → display
  ├── config.mjs    ← user preferences (keywords, filters, profile, scoring)
  ├── search.mjs    ← Puppeteer-based job search page scraper
  ├── enricher.mjs  ← job page fetching, __NEXT_DATA__ extraction, field mapping
  └── scorer.mjs    ← Gemini API integration, prompt engineering, JSON parsing
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

`search.mjs` has **two modes**:

| Mode | How to Use | When |
|------|-----------|------|
| **Connect** (default) | Start Chrome with `chrome.exe --remote-debugging-port=9222`, then run the scraper | Best for daily use — reuses your session, no challenges |
| **Launch** (`--launch` flag) | `node index.mjs --dry-run --launch` | Launches headed Chrome with persistent `chrome_session/` dir. May need to solve Cloudflare on first run |

Both modes detect Cloudflare's "Just a moment..." page and wait up to 120s for the user to solve it.

### Current Status (2026-04-24)
- ✅ `search.mjs` — Puppeteer-based search scraper, connects to user's Chrome. Launches with `userDataDir` set to `chrome_session` for persistent logins.
- ✅ `enricher.mjs` — Sequential enrichment with `networkidle2` wait and custom User-Agent to bypass "blank page" (Cloudflare silent block).
- ✅ `index.mjs` updated — `--dry-run` and `--launch` flags; destructures `{ jobs, browser }` from search, passes browser to enrichAll()
- ✅ `package.json` updated — added `puppeteer`, `puppeteer-extra`, `puppeteer-extra-plugin-stealth`; removed `fast-xml-parser`, `cheerio` (no longer needed in enricher)
- ✅ Removed `node-fetch` from enricher — all HTTP goes through Puppeteer now
- ⏳ Needs testing: run `npm run dry-run --launch` and check if enrichment succeeds
- ❌ Full scoring pipeline untested (blocked on enrichment verification)

### Browser Lifecycle
```
search.mjs:  launch/connect browser → scrape search → close search tab → return { jobs, browser }
index.mjs:   receive { jobs, browser } → pass browser to enrichAll()
enricher.mjs: for each job → open tab → extract __NEXT_DATA__ → close tab → finally → browser.close()
```
`browser.close()` is called exactly once, at the end of `enrichAll()` in `enricher.mjs`.

### DOM Selectors (extracted 2026-04-24)

These are in the `SELECTORS` object at the top of `search.mjs`:

| Purpose | Selector | Stability |
|---------|----------|-----------|
| Job list container | `[data-test="JobsList"]` | 🟢 Stable |
| Job card | `[data-test="JobTile"]` | 🟢 Stable |
| Title link | `a[data-test="job-tile-title-link UpLink"]` | 🟡 Medium |
| Published date | `[data-test="job-pubilshed-date"]` | 🟢 Stable (Upwork's own typo) |
| Description | `p.text-body-sm` | 🔴 Fragile (class-based) |

If selectors break, run `Docx/dom-inspector.js` in browser DevTools on the search page.

## Strategies to Mimic Human Behavior

To bypass Cloudflare Enterprise and Upwork's WAF, the scraper employs several layers of stealth and human-mimicry:

**Already Applied:**
1. **Shared Session / Extension Approach:** Runs in a headed Chrome window with a persistent profile (`chrome_session`) or connects to the user's real browser via port 9222.
2. **Stealth Plugin:** Uses `puppeteer-extra-plugin-stealth` to patch navigator webdriver flags and other basic bot fingerprints.
3. **Realistic Viewports & Headers:** Avoids headless defaults; forces `headless: false`, sets typical window sizes, and overrides the User-Agent.

**New Enhancements (Enricher):**
4. **Jitter Delays:** Replaced fixed 2.5s sleeps with randomized delays (1500ms - 4500ms) between page loads to break metronomic timing signatures.
5. **Adaptive Exponential Backoff:** When a soft block ("Just a moment" or blank page) is detected, the script backs off exponentially (5s, 10s, 20s) and retries up to 3 times instead of silently failing or waiting a flat 120s.
6. **Tab Reuse:** Reuses a single `page` object across the entire enrichment loop instead of tearing down and building new tabs per job, mimicking a user clicking links in the same tab and reducing initialization fingerprinting.
7. **Queue Shuffling:** Shuffles the order of job enrichment so the request pattern doesn't perfectly match the search results layout order.
8. **Rate Limit Awareness:** Listens for HTTP 429 responses. If detected, dynamically increases the jitter delay for the next request (5s - 10s) to cool down.
9. **Session Health Monitoring:** Tracks the ratio of failed enrichments. If >30% of requests fail after the first few attempts, it aborts the enrichment phase early to protect the session from being permanently burned.

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
| `search.mjs` | Puppeteer-based search page scraper. Connects to user's Chrome or launches headed browser |
| `enricher.mjs` | Fetches individual job pages, extracts client signals from `__NEXT_DATA__` |
| `scorer.mjs` | Sends jobs to Gemini with structured prompt, parses scored JSON response |
| `.env` | `GOOGLE_API_KEY` (not committed to git) |
| `chrome_session/` | Persistent Chrome profile for `--launch` mode (auto-created, gitignored) |
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

1. **Field path verification** — `enricher.mjs` uses best-guess paths for `__NEXT_DATA__` fields (`buyer.totalSpent.amount`, `buyer.hireRate`, etc.). After first successful run, check `Docx/nextdata-sample.json` to see the actual structure and fix any wrong paths.
2. **Cloudflare fragility** — Even with shared sessions, Cloudflare may re-challenge individual job pages. If a job shows `enriched: false` due to "Just a moment" title, it means Cloudflare blocked that specific page.
3. **Selector maintenance** — Upwork obfuscates CSS classes and may change `data-test` attributes at any time. Keep `Docx/dom-inspector.js` handy.
4. **Full scoring pipeline** — Once enrichment is verified, test `npm start` (without `--dry-run`) to exercise the Gemini scoring path.
