# Upwork Job Scoring Agent — Development Plan

## Overview
Node.js CLI tool that scrapes Upwork job listings via RSS, enriches each job with client quality signals by fetching the full job page, then uses Google Gemini API to score and rank jobs for bidding decisions.

## Tech Stack
- Node.js (ES Modules)
- node-fetch (HTTP requests)
- fast-xml-parser (RSS parsing)
- cheerio (HTML parsing fallback)
- @google/generative-ai (Gemini API — switched from Anthropic per user preference)
- dotenv (env vars)

---

## Task List

### 1. Project Setup
- [x] Create `package.json` with ES module config and dependencies
- [x] Create `.env` with `GOOGLE_API_KEY` placeholder
- [x] Create `.gitignore` (node_modules + .env)

### 2. Configuration Module
- [x] Create `config.mjs` with keywords, filters, profile, scoring criteria

### 3. RSS Feed Module
- [x] Create `rss.mjs` — build URL, fetch XML, parse with fast-xml-parser
- [x] Handle single-item vs array normalization
- [x] Strip tracking params from job links

### 4. Scraper / Enrichment Module
- [x] Create `scraper.mjs` — fetch job pages, extract `__NEXT_DATA__`
- [x] Regex extraction + cheerio fallback
- [x] Defensive field extraction with optional chaining (multiple JSON paths)
- [x] Sequential enrichment with 2.5s rate limiting
- [x] Proposal tier string → numeric parser

### 5. Scorer Module
- [x] Create `scorer.mjs` — Google Gemini integration (switched from Claude)
- [x] Structured system prompt with scoring rules
- [x] JSON response parsing with code-fence stripping safety net

### 6. Main Entry Point
- [x] Create `index.mjs` — full pipeline orchestration
- [x] RSS fetch → enrich → hard filters → Gemini scoring → formatted output
- [x] Verdict emojis, budget/client display, summary stats

### 7. Install & Verify
- [ ] Run `npm install` ⚠️ **BLOCKED — Node.js not installed on system**
- [ ] Verify no import/syntax errors with a dry run
- [ ] End-to-end test with real RSS feed

### 8. Documentation
- [x] Create `Docx/TaskList.md` (this file)
- [x] Create `Docx/Context.md` with project context and architecture notes

---

## Change Log
| Date       | Change |
|------------|--------|
| 2026-04-24 | Initial project scaffolding — all 6 source files created |
| 2026-04-24 | Switched from Anthropic Claude to Google Gemini API per user request |
| 2026-04-24 | Added devPlan.md and context.md documentation |
| 2026-04-24 | Node.js not found on system — npm install blocked until installed |
| 2026-04-24 | Reorganized documentation into `Docx/` folder and renamed files |
