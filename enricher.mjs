/**
 * Job Enrichment Module (enricher.mjs)
 *
 * Fetches each Upwork job page, extracts __NEXT_DATA__ JSON,
 * and enriches the job object with client quality signals.
 */

import fetch from "node-fetch";
import * as cheerio from "cheerio";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const DELAY_MS = 2500;

/**
 * Sleep helper for rate limiting.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Attempt to extract the __NEXT_DATA__ JSON from the page HTML.
 * Tries regex first, falls back to cheerio.
 *
 * @param {string} html - The raw HTML of the job page
 * @returns {object|null} Parsed JSON or null
 */
function extractNextData(html) {
  // Attempt 1: Regex extraction
  const regex = /<script\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i;
  const match = html.match(regex);

  if (match?.[1]) {
    try {
      return JSON.parse(match[1]);
    } catch {
      // Fall through to cheerio
    }
  }

  // Attempt 2: Cheerio fallback
  try {
    const $ = cheerio.load(html);
    const scriptContent = $("#__NEXT_DATA__").html();
    if (scriptContent) {
      return JSON.parse(scriptContent);
    }
  } catch {
    // Extraction failed
  }

  return null;
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
    contractorTier: null,
    weeklyHours: null,
  };

  // Try multiple root paths for the job data
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

  // --- Job Details ---
  result.fullDescription =
    jobData?.description ||
    jobData?.jobDescription ||
    jobData?.attrs?.description ||
    null;

  // Budget
  const budget = jobData?.budget || jobData?.amount || jobData?.fixedAmount;
  if (typeof budget === "object" && budget !== null) {
    result.budgetAmount = budget?.amount ?? null;
    result.budgetMin = budget?.min ?? budget?.minimum ?? null;
    result.budgetMax = budget?.max ?? budget?.maximum ?? null;
  } else if (typeof budget === "number") {
    result.budgetAmount = budget;
  }

  // Also check top-level amount fields
  if (result.budgetAmount === null) {
    result.budgetAmount =
      jobData?.fixedAmount?.amount ??
      jobData?.hourlyBudget?.amount ??
      jobData?.estimatedBudget?.amount ??
      null;
  }

  // --- Client Info ---
  const client =
    jobData?.client ||
    jobData?.buyer ||
    jobData?.clientInfo ||
    jobData?.attrs?.client ||
    {};

  // Total spent
  const totalSpent =
    client?.totalSpent || client?.spentAmount || client?.stats?.totalSpent;
  if (typeof totalSpent === "object" && totalSpent !== null) {
    result.clientTotalSpent = totalSpent?.amount ?? null;
  } else if (typeof totalSpent === "number") {
    result.clientTotalSpent = totalSpent;
  }

  // Hires and posted jobs
  result.clientTotalHires =
    client?.totalHires ??
    client?.hires ??
    client?.stats?.totalHires ??
    null;

  result.clientTotalPostedJobs =
    client?.totalPostedJobs ??
    client?.jobsPosted ??
    client?.stats?.totalPostedJobs ??
    null;

  // Hire rate — calculate if not directly available
  result.clientHireRate =
    client?.hireRate ?? client?.stats?.hireRate ?? null;

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

  // Rating
  result.clientScore =
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
    client?.country ??
    client?.location?.name ??
    null;

  // --- Proposals & Tier ---
  result.proposalsTier =
    jobData?.proposalsTier ??
    jobData?.applicants?.proposalsTier ??
    jobData?.attrs?.proposalsTier ??
    null;

  result.contractorTier =
    jobData?.contractorTier ??
    jobData?.tierLabel ??
    jobData?.attrs?.contractorTier ??
    null;

  result.weeklyHours =
    jobData?.weeklyHours ??
    jobData?.engagement?.hours ??
    jobData?.attrs?.weeklyHours ??
    null;

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
 * Enrich a single job object by fetching its page and extracting data.
 *
 * @param {object} jobObj - The basic job object from search
 * @returns {Promise<object>} The enriched job object
 */
export async function enrichJob(jobObj) {
  try {
    const response = await fetch(jobObj.link, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      console.log(
        `    ⚠️  HTTP ${response.status} for ${jobObj.title.slice(0, 50)}...`
      );
      return { ...jobObj, enriched: false };
    }

    const html = await response.text();
    const nextData = extractNextData(html);

    if (!nextData) {
      console.log(`    ⚠️  No __NEXT_DATA__ found for: ${jobObj.title.slice(0, 50)}...`);
      return { ...jobObj, enriched: false };
    }

    const fields = extractJobFields(nextData);

    return {
      ...jobObj,
      ...fields,
      proposalCount: parseProposalCount(fields.proposalsTier),
      enriched: true,
    };
  } catch (err) {
    console.log(
      `    ⚠️  Enrichment failed for "${jobObj.title.slice(0, 50)}...": ${err.message}`
    );
    return { ...jobObj, enriched: false };
  }
}

/**
 * Enrich all jobs sequentially with rate limiting.
 *
 * @param {Array<object>} jobsList - Array of basic job objects
 * @returns {Promise<Array<object>>} Array of enriched job objects
 */
export async function enrichAll(jobsList) {
  const enriched = [];

  for (let i = 0; i < jobsList.length; i++) {
    const job = jobsList[i];
    console.log(
      `  Enriching job ${i + 1}/${jobsList.length}: ${job.title.slice(0, 60)}...`
    );

    const result = await enrichJob(job);
    enriched.push(result);

    // Rate limit — always wait between requests
    if (i < jobsList.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  return enriched;
}
