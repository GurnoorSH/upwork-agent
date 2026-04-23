# Upwork Job Scoring Agent — Project Context

## What This Tool Does

A Node.js CLI tool that automates the process of finding and evaluating Upwork job listings for freelance bidding. It runs three stages:

1. **RSS Fetch** — Pulls recent job listings from Upwork's RSS feed based on your configured keywords
2. **Enrichment** — Visits each job page to extract client quality signals (spend history, hire rate, ratings, proposals count) from the `__NEXT_DATA__` JSON blob
3. **AI Scoring** — Sends enriched job data to Google Gemini, which scores each job 1-10 and provides a BID/MAYBE/SKIP verdict with reasons and a proposal opener

## Architecture

```
index.mjs          ← orchestrator: fetch → enrich → filter → score → display
  ├── config.mjs   ← user preferences (keywords, filters, profile, scoring)
  ├── rss.mjs      ← RSS feed construction, fetch, XML parsing
  ├── scraper.mjs  ← job page fetching, __NEXT_DATA__ extraction, field mapping
  └── scorer.mjs   ← Gemini API integration, prompt engineering, JSON parsing
```

### Data Flow

```
Upwork RSS Feed (XML)
  → parse to [{title, link, pubDate, description}]
  → fetch each job page (sequential, 2.5s delay)
  → extract __NEXT_DATA__ JSON → client signals
  → hard filter (budget, proposals)
  → send to Gemini with scoring rules
  → [{score, verdict, reasons, redFlags, proposalOpener}]
  → formatted terminal output
```

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
| `rss.mjs` | Builds Upwork RSS URL, fetches and parses XML feed |
| `scraper.mjs` | Fetches job pages, extracts client signals from `__NEXT_DATA__` |
| `scorer.mjs` | Sends jobs to Gemini with structured prompt, parses scored JSON response |
| `.env` | `GOOGLE_API_KEY` (not committed to git) |
| `Docx/TaskList.md` | Task tracking and change log |
| `Docx/Context.md` | This file — project architecture and design notes |

## Configuration Reference

Edit `config.mjs` to customize:

- **keywords** — search terms joined with `+` in the RSS query
- **jobType** — `"fixed"`, `"hourly"`, or `"both"`
- **minBudget** — USD threshold; jobs below this are filtered out
- **maxProposals** — competition threshold; jobs above this are filtered out
- **preferredCountries** — client countries that get a scoring bonus
- **myProfile** — your freelancer description (used in Gemini prompt)
- **scoringCriteria** — natural language instructions for how Gemini should score

## Running the Tool

**Repository**: `https://github.com/GurnoorSH/upwork-agent.git`

```bash
# 1. Install Node.js (v18+ recommended)
# 2. Install dependencies
npm install

# 3. Add your Google API key to .env
#    GOOGLE_API_KEY=your_actual_key

# 4. Customize config.mjs with your keywords and profile

# 5. Run
npm start
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
