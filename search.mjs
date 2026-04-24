/**
 * Upwork Job Search Module (search.mjs)
 *
 * Strategy (learned from how Chrome extensions bypass Cloudflare):
 * Extensions work because they run inside the user's REAL browser
 * session — Cloudflare never sees a bot. We do the same thing:
 *
 *   Mode 1 (default): Connect to your already-running Chrome via
 *   remote debugging port. You're already logged in, Cloudflare
 *   trusts your session → no challenges.
 *
 *   Mode 2 (--launch flag): Launch a headed Chrome with a persistent
 *   user-data-dir so cookies survive between runs. First run may
 *   require solving a Cloudflare challenge; subsequent runs reuse it.
 *
 * Output shape:
 *   [{ title, link, pubDate, description }]
 */

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fetch from "node-fetch";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

puppeteer.use(StealthPlugin());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Configurable knobs ─────────────────────────────────────
const REMOTE_DEBUGGING_PORT = 9222;
const PAGE_LOAD_TIMEOUT_MS = 60_000;
const CARD_WAIT_TIMEOUT_MS = 30_000;
const POST_RENDER_SETTLE_MS = 3_000;
const USER_DATA_DIR = join(__dirname, ".chrome-profile");

// ── CLI mode detection ─────────────────────────────────────
const USE_LAUNCH_MODE = process.argv.includes("--launch");

// ────────────────────────────────────────────────────────────
// DOM SELECTORS — Upwork obfuscates class names; these rely on
// stable data-test attributes extracted from a live session on
// 2026-04-24. Flag ⚠️  marks selectors most likely to break.
//
// If scraping stops working, re-run the inspector script from
//   Docx/dom-inspector.js
// and update the selectors below.
// ────────────────────────────────────────────────────────────
const SELECTORS = {
  /** Container holding all job tiles */
  jobList:        '[data-test="JobsList"]',                     // ⚠️  stable data-test attr
  /** Individual job card (article element) */
  jobCard:        '[data-test="JobTile"]',                      // ⚠️  stable data-test attr
  /** Title link inside a card */
  titleLink:      'a[data-test="job-tile-title-link UpLink"]',  // ⚠️  compound data-test value
  /** Published date — note Upwork's own typo: "pubilshed" */
  pubDate:        '[data-test="job-pubilshed-date"]',           // ⚠️  typo is intentional (Upwork's)
  /** Description paragraph — class-based, more fragile */
  description:    'p.text-body-sm',                             // ⚠️  class-based, fragile
  /** Fallback description selector */
  descriptionAlt: '[data-test*="JobDescription"]',              // ⚠️  may or may not exist on cards
};

/**
 * Build the Upwork search URL from the config object.
 * @param {object} config
 * @returns {string}
 */
function buildSearchUrl(config) {
  const queryString = config.keywords
    .map((kw) => encodeURIComponent(kw))
    .join("+");

  let url = `https://www.upwork.com/nx/search/jobs/?q=${queryString}&sort=recency`;

  if (config.jobType === "fixed") {
    url += "&job_type=fixed";
  } else if (config.jobType === "hourly") {
    url += "&job_type=hourly";
  }

  return url;
}

/**
 * Try to connect to an already-running Chrome with remote debugging enabled.
 * Returns the browser instance, or null if Chrome isn't running with debugging.
 */
async function connectToExistingChrome() {
  try {
    const res = await fetch(`http://127.0.0.1:${REMOTE_DEBUGGING_PORT}/json/version`, {
      signal: AbortSignal.timeout(2000),
    });
    const data = await res.json();
    const wsUrl = data.webSocketDebuggerUrl;

    if (!wsUrl) return null;

    console.log("  🔌 Connecting to your running Chrome browser...");
    const browser = await puppeteer.connect({
      browserWSEndpoint: wsUrl,
      defaultViewport: null,
    });
    return { browser, connected: true };
  } catch {
    return null;
  }
}

/**
 * Launch a headed Chrome with a persistent profile directory.
 * Cookies and sessions are preserved between runs.
 */
async function launchFreshChrome() {
  console.log("  🚀 Launching Chrome with persistent profile...");
  console.log(`     Profile dir: ${USER_DATA_DIR}`);

  const browser = await puppeteer.launch({
    headless: false,   // MUST be headed to solve Cloudflare on first run
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
      "--window-size=1920,1080",
      `--user-data-dir=${USER_DATA_DIR}`,
    ],
    defaultViewport: { width: 1920, height: 1080 },
  });

  return { browser, connected: false };
}

/**
 * Extract job data from rendered DOM. Runs inside the browser context.
 * @param {object} selectors
 * @returns {Array<{title: string, link: string, pubDate: string, description: string}>}
 */
function extractJobsFromPage(selectors) {
  const cards = document.querySelectorAll(selectors.jobCard);
  const jobs = [];

  cards.forEach((card) => {
    // ── Title & Link ──
    const titleEl = card.querySelector(selectors.titleLink)
      || card.querySelector("h2 a")
      || card.querySelector("h3 a");

    const title = titleEl?.textContent?.trim() || "Untitled";

    let link = titleEl?.getAttribute("href") || "";
    if (link.startsWith("/")) {
      link = `https://www.upwork.com${link}`;
    }
    link = link.split("?")[0];

    // ── Published Date ──
    const dateEl = card.querySelector(selectors.pubDate);
    const pubDate = dateEl?.textContent?.trim() || "";

    // ── Description ──
    const descEl = card.querySelector(selectors.description)
      || card.querySelector(selectors.descriptionAlt)
      || card.querySelector("p");
    const description = descEl?.textContent?.trim() || "";

    if (link) {
      jobs.push({ title, link, pubDate, description });
    }
  });

  return jobs;
}

/**
 * Fetch and parse Upwork job listings by scraping the search page.
 * Returns both the jobs array AND the browser instance so the
 * enricher can reuse the same session (Cloudflare cookies).
 *
 * @param {object} config - The user config object
 * @returns {Promise<{jobs: Array<{title: string, link: string, pubDate: string, description: string}>, browser: object}>}
 */
export async function fetchJobUrls(config) {
  const url = buildSearchUrl(config);
  console.log(`  Search URL: ${url}`);

  let browserObj;
  let page;

  try {
    // ── Mode 1: Connect to existing Chrome (preferred) ──
    if (!USE_LAUNCH_MODE) {
      browserObj = await connectToExistingChrome();
    }

    // ── Mode 2: Launch fresh if connect failed or --launch flag ──
    if (!browserObj) {
      if (!USE_LAUNCH_MODE) {
        console.log("");
        console.log("  ⚠️  Could not connect to Chrome. Start it with remote debugging:");
        console.log("");
        console.log("     chrome.exe --remote-debugging-port=9222");
        console.log("");
        console.log("  Or run with --launch flag to auto-launch a browser:");
        console.log("     node index.mjs --dry-run --launch");
        console.log("");
        console.log("  Trying launch mode as fallback...");
        console.log("");
      }
      browserObj = await launchFreshChrome();
    }

    const { browser, connected } = browserObj;

    // If we connected to existing Chrome, open a new tab
    // If we launched, use the default page
    if (connected) {
      page = await browser.newPage();
    } else {
      const pages = await browser.pages();
      page = pages[0] || await browser.newPage();
    }

    console.log("  📄 Navigating to Upwork search...");
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: PAGE_LOAD_TIMEOUT_MS,
    });

    // Check if we hit a Cloudflare challenge
    const pageTitle = await page.title();
    if (pageTitle.toLowerCase().includes("just a moment")) {
      console.log("");
      console.log("  🛡️  Cloudflare challenge detected!");
      console.log("  👆 Please solve it in the browser window...");
      console.log("  ⏳ Waiting up to 120 seconds...");
      console.log("");

      await page.waitForFunction(
        () => !document.title.toLowerCase().includes("just a moment"),
        { timeout: 120_000 }
      );

      console.log("  ✅ Cloudflare challenge solved! Continuing...");
      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: PAGE_LOAD_TIMEOUT_MS })
        .catch(() => {});
    }

    // Check if we're logged out (launched browser has no session)
    const isLoggedOut = await page.evaluate(() => {
      const body = document.body?.innerText || "";
      // Logged-out pages show these nav links
      return body.includes("Log in") && body.includes("Sign up");
    });

    if (isLoggedOut) {
      console.log("");
      console.log("  🔐 Not logged in to Upwork!");
      console.log("  👆 Please log in to your account in the browser window...");
      console.log("  ⏳ Waiting up to 120 seconds...");
      console.log("");

      // Navigate to login page
      await page.goto("https://www.upwork.com/ab/account-security/login", {
        waitUntil: "networkidle2",
        timeout: PAGE_LOAD_TIMEOUT_MS,
      });

      // Wait for login to complete (URL changes away from login page)
      await page.waitForFunction(
        () => !window.location.href.includes("/login"),
        { timeout: 120_000 }
      );

      console.log("  ✅ Login detected! Navigating to search...");

      // Re-navigate to the search page now that we're authenticated
      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: PAGE_LOAD_TIMEOUT_MS,
      });
    }

    // Wait for job cards to render
    console.log("  Waiting for job cards to render...");
    try {
      await page.waitForSelector(SELECTORS.jobCard, {
        timeout: CARD_WAIT_TIMEOUT_MS,
      });
    } catch {
      // Try the list container as fallback
      console.log("  ⚠️  Primary card selector not found, trying fallback...");
      try {
        await page.waitForSelector(SELECTORS.jobList, {
          timeout: 10_000,
        });
      } catch {
        // Last resort: maybe the page structure changed entirely
        console.log("  ⚠️  No known selectors found. Dumping page title for debug:");
        const title = await page.title();
        console.log(`     Page title: "${title}"`);
        const bodyText = await page.evaluate(() =>
          document.body?.innerText?.slice(0, 500)
        );
        console.log(`     Body preview: ${bodyText?.slice(0, 200)}`);
        throw new Error(
          "Could not find job cards on the page. Selectors may have changed — " +
          "run Docx/dom-inspector.js in DevTools to discover new selectors."
        );
      }
    }

    // Give the SPA a moment to finish hydrating
    await new Promise((r) => setTimeout(r, POST_RENDER_SETTLE_MS));

    // Extract jobs
    const jobs = await page.evaluate(extractJobsFromPage, SELECTORS);
    console.log(`  ✅ Scraped ${jobs.length} job cards from search page.`);

    // DON'T close the search tab — closing the last tab kills a launched browser.
    // Navigate to about:blank to free memory while keeping the browser alive.
    await page.goto("about:blank").catch(() => {});

    // Return both jobs and the browser instance
    // The enricher will reuse this browser and close it when done
    return { jobs, browser };

  } catch (err) {
    // On error, clean up the browser before re-throwing
    if (browserObj?.connected) {
      browserObj.browser.disconnect();
    } else if (browserObj?.browser) {
      await browserObj.browser.close().catch(() => {});
    }
    throw err;
  }
}

