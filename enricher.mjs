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

const PAGE_TIMEOUT_MS = 30_000;

/**
 * Jitter helper for human-like randomized delays.
 * @param {number} min 
 * @param {number} max 
 * @returns {Promise<void>}
 */
const jitter = (min = 1500, max = 4500) =>
  new Promise(r => setTimeout(r, Math.random() * (max - min) + min));

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
 * Enrich a single job object by navigating the shared page and extracting __NEXT_DATA__ JSON.
 *
 * @param {object} jobObj - The basic job object from search
 * @param {object} page - The shared Puppeteer page instance
 * @param {boolean} isFirst - If true, dump raw nextData to file for debugging
 * @returns {Promise<object>} The enriched job object
 */
async function enrichJob(jobObj, page, isFirst) {
  const retries = 3;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`    🔗 Navigating to: ${jobObj.title.slice(0, 40)}...`);
      
      await page.goto(jobObj.link, {
        waitUntil: "networkidle2",
        timeout: PAGE_TIMEOUT_MS,
      });

      // Check for Cloudflare challenge or blank page
      const title = await page.title();
      const content = await page.content();
      
      if (
        title.toLowerCase().includes("just a moment") ||
        title.toLowerCase().includes("attention required") ||
        content.includes("cloudflare")
      ) {
        const backoff = Math.pow(2, attempt) * 5000; // 5s, 10s, 20s
        console.warn(`    🛡️  Cloudflare hit on attempt ${attempt + 1}, waiting ${backoff/1000}s`);
        await new Promise(r => setTimeout(r, backoff));
        continue;
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
        const isBlank = await page.evaluate(() => document.body.innerText.trim().length === 0);
        if (isBlank) {
          console.log(`    ❌ Page went blank. This is likely a Cloudflare block.`);
        } else {
          console.log(`    ⚠️  No __NEXT_DATA__ found (maybe selectors changed).`);
        }
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
      if (attempt < retries - 1) {
        console.log(`    🔄 Retrying (${attempt + 1}/${retries})...`);
        await jitter(2000, 5000);
      }
    }
  }

  // Fallback if all retries fail
  return { ...jobObj, enriched: false };
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
  let page;

  try {
    if (!browser.connected) {
      console.log("  ❌ Browser disconnected — cannot enrich.");
      return jobsList.map((j) => ({ ...j, enriched: false }));
    }

    page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36");

    let rateLimited = false;
    page.on('response', response => {
      if (response.status() === 429) {
        console.warn('    ⚠️  Rate limited (HTTP 429) detected');
        rateLimited = true;
      }
    });

    // Shuffle the enrichment queue to avoid predictable patterns
    const shuffled = [...jobsList].sort(() => Math.random() - 0.5);
    let failedCount = 0;

    for (let i = 0; i < shuffled.length; i++) {
      const job = shuffled[i];
      console.log(`\n  Enriching job ${i + 1}/${shuffled.length}: ${job.title.slice(0, 60)}...`);

      const isFirst = (i === 0);
      const result = await enrichJob(job, page, isFirst);
      enriched.push(result);

      if (!result.enriched) {
        failedCount++;
      }

      // Session health check: abort if >30% fail (min 3 failures)
      const failRatio = failedCount / (i + 1);
      if (i >= 3 && failRatio > 0.3) {
        console.log(`\n  🚨 Aborting enrichment: Failure rate too high (${Math.round(failRatio * 100)}%). Session may be blocked.`);
        // Mark remaining jobs as unenriched
        for (let j = i + 1; j < shuffled.length; j++) {
          enriched.push({ ...shuffled[j], enriched: false });
        }
        break;
      }

      // Jitter delay between requests
      if (i < shuffled.length - 1) {
        if (rateLimited) {
          console.log('    ⏳ Backing off due to rate limits...');
          await jitter(5000, 10000);
          rateLimited = false; // Reset flag for next request
        } else {
          await jitter(1500, 4500);
        }
      }
    }
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
    // Browser lifecycle ends here — close it regardless of success/failure
    console.log("\n  🔒 Closing browser...");
    await browser.close().catch(() => {});
  }

  return enriched;
}
