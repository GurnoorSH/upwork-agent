/**
 * Job Enrichment Module (enricher.mjs)
 *
 * Opens Puppeteer pages on the shared browser instance (from search.mjs)
 * to fetch each Upwork job page. This reuses the real Chrome session
 * and Cloudflare cookies, avoiding bot detection.
 *
 * Extracts __NEXT_DATA__ JSON from each job page and enriches the
 * job object with client quality signals (spend, hire rate, etc.).
 *
 * The browser is closed at the end of enrichAll() — this module
 * owns the browser lifecycle after search.mjs hands it off.
 */

import { writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DELAY_MS = 2500;
const PAGE_TIMEOUT_MS = 30_000;

/**
 * Sleep helper for rate limiting.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Navigate nested objects safely to find job data.
 * Upwork's __NEXT_DATA__ structure can vary — we try multiple paths.
 *
 * @param {object} nextData - The parsed __NEXT_DATA__ JSON
 * @returns {object} Extracted fields (may be partially filled)
 */
function extractJobFields(nextData) {
  const result = {
    fullDescription: null,
    budgetAmount: null,
    budgetMin: null,
    budgetMax: null,
    clientTotalSpent: null,
    clientTotalHires: null,
    clientTotalPostedJobs: null,
    clientHireRate: null,
    clientScore: null,
    clientReviewsCount: null,
    clientCountry: null,
    proposalsTier: null,
    proposalCount: null,
    contractorTier: null,
    weeklyHours: null,
    skills: null,
  };

  // ── Find the root job data object ──
  // Upwork nests this differently across page types
  const props = nextData?.props?.pageProps;
  const jobData =
    props?.job ||
    props?.opening ||
    props?.jobInfo ||
    props?.data?.job ||
    props?.data?.opening ||
    props;

  if (!jobData) {
    console.log(
      "    ⚠️  Could not locate job data. Top-level keys:",
      Object.keys(nextData?.props?.pageProps || nextData?.props || nextData || {})
    );
    return result;
  }

  // Also try a separate posting data path
  const postingData =
    jobData?.jobPostingData ||
    jobData?.posting ||
    jobData;

  // ── Job Details ──
  result.fullDescription =
    jobData?.description ||
    jobData?.jobDescription ||
    postingData?.description ||
    jobData?.attrs?.description ||
    null;

  // ── Budget ──
  const budget =
    postingData?.budget ||
    jobData?.budget ||
    jobData?.amount ||
    jobData?.fixedAmount;

  if (typeof budget === "object" && budget !== null) {
    result.budgetAmount = budget?.amount ?? null;
    result.budgetMin = budget?.min ?? budget?.minimum ?? budget?.from ?? null;
    result.budgetMax = budget?.max ?? budget?.maximum ?? budget?.to ?? null;
  } else if (typeof budget === "number") {
    result.budgetAmount = budget;
  }

  if (result.budgetAmount === null) {
    result.budgetAmount =
      jobData?.fixedAmount?.amount ??
      postingData?.hourlyBudget?.from ??
      jobData?.hourlyBudget?.amount ??
      jobData?.estimatedBudget?.amount ??
      null;
  }

  // ── Client / Buyer Info ──
  // Upwork uses "buyer" in __NEXT_DATA__, "client" in some variations
  const client =
    jobData?.buyer ||
    jobData?.client ||
    jobData?.clientInfo ||
    jobData?.attrs?.client ||
    {};

  // Total spent
  const totalSpent =
    client?.totalSpent ||
    client?.totalCharges ||
    client?.spentAmount ||
    client?.stats?.totalSpent;

  if (typeof totalSpent === "object" && totalSpent !== null) {
    result.clientTotalSpent = totalSpent?.amount ?? null;
  } else if (typeof totalSpent === "number") {
    result.clientTotalSpent = totalSpent;
  }

  // Hires
  result.clientTotalHires =
    client?.totalHires ??
    client?.hires ??
    client?.stats?.totalHires ??
    null;

  // Posted jobs
  result.clientTotalPostedJobs =
    client?.totalPostedJobs ??
    client?.jobsPosted ??
    client?.stats?.totalPostedJobs ??
    null;

  // Hire rate
  result.clientHireRate =
    client?.hireRate ??
    client?.stats?.hireRate ??
    null;

  if (
    result.clientHireRate === null &&
    result.clientTotalHires !== null &&
    result.clientTotalPostedJobs !== null &&
    result.clientTotalPostedJobs > 0
  ) {
    result.clientHireRate = +(
      (result.clientTotalHires / result.clientTotalPostedJobs) *
      100
    ).toFixed(1);
  }

  // Rating / feedback score
  result.clientScore =
    client?.feedbackScore ??
    client?.score ??
    client?.rating ??
    client?.feedback?.score ??
    client?.stats?.score ??
    null;

  result.clientReviewsCount =
    client?.reviewsCount ??
    client?.totalReviews ??
    client?.feedback?.count ??
    client?.stats?.reviewsCount ??
    null;

  // Location
  result.clientCountry =
    client?.location?.country ??
    client?.countryName ??
    client?.country ??
    client?.location?.name ??
    null;

  // ── Proposals ──
  result.proposalsTier =
    postingData?.proposalsTier ??
    jobData?.proposalsTier ??
    jobData?.applicants?.proposalsTier ??
    jobData?.attrs?.proposalsTier ??
    null;

  result.proposalCount =
    postingData?.totalApplicants ??
    jobData?.totalApplicants ??
    null;

  // ── Tier & Hours ──
  result.contractorTier =
    postingData?.contractorTier ??
    jobData?.contractorTier ??
    jobData?.tierLabel ??
    jobData?.attrs?.contractorTier ??
    null;

  result.weeklyHours =
    postingData?.weeklyHours ??
    jobData?.weeklyHours ??
    jobData?.engagement?.hours ??
    jobData?.attrs?.weeklyHours ??
    null;

  // ── Skills ──
  const rawSkills =
    postingData?.skills ??
    jobData?.skills ??
    jobData?.attrs?.skills ??
    null;

  if (Array.isArray(rawSkills)) {
    result.skills = rawSkills
      .map((s) => (typeof s === "string" ? s : s?.name ?? s?.prettyName ?? null))
      .filter(Boolean);
  }

  return result;
}

/**
 * Parse the proposals tier string into a numeric estimate.
 * e.g. "10 to 15" → 15, "Less than 5" → 5, "50+" → 50
 *
 * @param {string|null} tier
 * @returns {number|null}
 */
export function parseProposalCount(tier) {
  if (!tier) return null;

  const str = String(tier).toLowerCase();

  // "50+" or "20+"
  const plusMatch = str.match(/(\d+)\+/);
  if (plusMatch) return parseInt(plusMatch[1], 10);

  // "10 to 15"
  const rangeMatch = str.match(/(\d+)\s*to\s*(\d+)/);
  if (rangeMatch) return parseInt(rangeMatch[2], 10);

  // "Less than 5"
  const lessMatch = str.match(/less\s*than\s*(\d+)/);
  if (lessMatch) return parseInt(lessMatch[1], 10);

  // Just a number
  const numMatch = str.match(/(\d+)/);
  if (numMatch) return parseInt(numMatch[1], 10);

  return null;
}

/**
 * Enrich a single job object by opening a Puppeteer page on the
 * shared browser and extracting __NEXT_DATA__ JSON.
 *
 * @param {object} jobObj - The basic job object from search
 * @param {object} browser - The Puppeteer browser instance
 * @param {boolean} isFirst - If true, dump raw nextData to file for debugging
 * @returns {Promise<object>} The enriched job object
 */
async function enrichJob(jobObj, browser, isFirst) {
  let page;
  try {
    // Check if browser is still alive
    if (!browser.connected) {
      console.log("    ❌ Browser disconnected — cannot enrich.");
      return { ...jobObj, enriched: false };
    }

    page = await browser.newPage();

    // Note: NOT using request interception — it can break Cloudflare clearance cookies
    await page.goto(jobObj.link, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_TIMEOUT_MS,
    });

    // Check for Cloudflare challenge
    const title = await page.title();
    if (
      title.toLowerCase().includes("just a moment") ||
      title.toLowerCase().includes("attention required")
    ) {
      console.log(`    ⚠️  Cloudflare blocked enrichment for: ${jobObj.title.slice(0, 50)}...`);
      return { ...jobObj, enriched: false };
    }

    // Extract __NEXT_DATA__ from the DOM
    const nextData = await page.evaluate(() => {
      const el = document.getElementById("__NEXT_DATA__");
      if (!el) return null;
      try {
        return JSON.parse(el.textContent);
      } catch {
        return null;
      }
    });

    if (!nextData) {
      console.log(`    ⚠️  No __NEXT_DATA__ found for: ${jobObj.title.slice(0, 50)}...`);
      return { ...jobObj, enriched: false };
    }

    // Dump the first job's raw JSON for path verification
    if (isFirst) {
      try {
        const samplePath = join(__dirname, "Docx", "nextdata-sample.json");
        await writeFile(samplePath, JSON.stringify(nextData, null, 2), "utf-8");
        console.log(`    📋 Wrote raw __NEXT_DATA__ to Docx/nextdata-sample.json`);
      } catch (writeErr) {
        console.log(`    ⚠️  Could not write sample JSON: ${writeErr.message}`);
      }
    }

    const fields = extractJobFields(nextData);

    return {
      ...jobObj,
      ...fields,
      proposalCount: fields.proposalCount ?? parseProposalCount(fields.proposalsTier),
      enriched: true,
    };

  } catch (err) {
    console.log(
      `    ⚠️  Enrichment failed for "${jobObj.title.slice(0, 50)}...": ${err.message}`
    );
    return { ...jobObj, enriched: false };

  } finally {
    // Always close the tab, never the browser
    if (page) {
      await page.close().catch(() => {});
    }
  }
}

/**
 * Enrich all jobs sequentially with rate limiting.
 * Closes the browser after all enrichment is complete.
 *
 * @param {Array<object>} jobsList - Array of basic job objects
 * @param {object} browser - The Puppeteer browser instance from search.mjs
 * @returns {Promise<Array<object>>} Array of enriched job objects
 */
export async function enrichAll(jobsList, browser) {
  const enriched = [];

  try {
    for (let i = 0; i < jobsList.length; i++) {
      const job = jobsList[i];
      console.log(
        `  Enriching job ${i + 1}/${jobsList.length}: ${job.title.slice(0, 60)}...`
      );

      const isFirst = (i === 0);
      const result = await enrichJob(job, browser, isFirst);
      enriched.push(result);

      // Rate limit — always wait between requests
      if (i < jobsList.length - 1) {
        await sleep(DELAY_MS);
      }
    }
  } finally {
    // Browser lifecycle ends here — close it regardless of success/failure
    console.log("\n  🔒 Closing browser...");
    await browser.close().catch(() => {});
  }

  return enriched;
}
