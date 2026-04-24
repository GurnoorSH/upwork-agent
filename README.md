# Upwork Job Scoring Agent

CLI tool that scrapes Upwork job listings, enriches them with client data, and uses Google Gemini to score and rank jobs for bidding.

## Setup

```bash
npm install
```

Add your Gemini key to `.env`:
```
GOOGLE_API_KEY=your_key_here
```

Edit `config.mjs` with your keywords and freelancer profile.

## Usage

```bash
# Start Chrome with remote debugging
chrome.exe --remote-debugging-port=9222

# Test run (no Gemini scoring)
npm run dry-run

# Full run with AI scoring
npm start

# If Chrome isn't running, launch a separate browser
node index.mjs --dry-run --launch
```

## How It Works

1. **Search** → Puppeteer scrapes Upwork's job search page via your real Chrome session
2. **Enrich** → Opens each job page to extract client spend, hire rate, rating, proposals
3. **Score** → Gemini rates each job 1–10 with BID / MAYBE / SKIP verdict + proposal opener
