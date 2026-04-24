/**
 * Upwork Job Scoring Agent — Main Entry Point
 *
 * Fetches Upwork search results → enriches jobs with client data →
 * scores with Google Gemini → prints ranked results.
 *
 * Flags:
 *   --dry-run   Skip Gemini scoring and print enriched jobs instead
 *   --launch    Launch a new headed Chrome instead of connecting to existing one
 *               (use when Chrome isn't running with --remote-debugging-port=9222)
 */

import "dotenv/config";
import config from "./config.mjs";
import { fetchJobUrls } from "./search.mjs";
import { enrichAll, parseProposalCount } from "./enricher.mjs";
import { scoreJobs } from "./scorer.mjs";

// ── CLI flags ──────────────────────────────────────────────
const DRY_RUN = process.argv.includes("--dry-run");

// ── Verdict emoji mapping ──────────────────────────────────
const VERDICT_EMOJI = { BID: "🔥", MAYBE: "📊", SKIP: "❌" };

/**
 * Format a dollar amount for display.
 * @param {number|null|undefined} amt
 * @returns {string}
 */
function fmtMoney(amt) {
  if (amt === null || amt === undefined) return "N/A";
  return `$${Number(amt).toLocaleString()}`;
}

/**
 * Print a single scored job to the terminal.
 * @param {object} job
 */
function printJob(job) {
  const emoji = VERDICT_EMOJI[job.verdict] || "❓";
  const sep = "━".repeat(50);

  console.log(`\n${sep}`);
  console.log(`${emoji} SCORE ${job.score}/10 — ${job.title}`);
  console.log(
    `💰 Budget: ${fmtMoney(job.budget)} | 👤 Client spent: ${fmtMoney(job.clientSpent)} | ` +
    `Hire rate: ${job.hireRate || "N/A"} | Proposals: ${job.proposals || "N/A"}`
  );

  if (job.reasons?.length) {
    job.reasons.forEach((r) => console.log(`  ✅ ${r}`));
  }
  if (job.redFlags?.length) {
    job.redFlags.forEach((f) => console.log(`  ⚠️  ${f}`));
  }
  if (job.proposalOpener) {
    console.log(`  💬 Opener: "${job.proposalOpener}"`);
  }
  console.log(`  🔗 ${job.url}`);
}

/**
 * Print a single enriched job in dry-run mode (no Gemini scoring).
 * @param {object} job
 * @param {number} index
 */
function printDryRunJob(job, index) {
  const sep = "━".repeat(50);
  console.log(`\n${sep}`);
  console.log(`#${index + 1}  ${job.title}`);
  console.log(`  🔗 ${job.link}`);
  console.log(`  📅 ${job.pubDate || "N/A"}`);
  console.log(`  💰 Budget: ${fmtMoney(job.budgetAmount ?? job.budgetMin ?? null)}`);
  console.log(
    `  👤 Client spent: ${fmtMoney(job.clientTotalSpent)} | ` +
    `Hires: ${job.clientTotalHires ?? "N/A"} | ` +
    `Hire rate: ${job.clientHireRate ? `${job.clientHireRate}%` : "N/A"} | ` +
    `Rating: ${job.clientScore ?? "N/A"}`
  );
  console.log(`  📝 Proposals: ${job.proposalsTier ?? job.proposalCount ?? "N/A"}`);
  console.log(`  🌍 Country: ${job.clientCountry ?? "N/A"}`);
  console.log(`  ✅ Enriched: ${job.enriched ? "Yes" : "No"}`);

  const desc = (job.fullDescription || job.description || "").slice(0, 200);
  if (desc) {
    console.log(`  📄 ${desc}${desc.length >= 200 ? "..." : ""}`);
  }
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  if (DRY_RUN) {
    console.log("\n🧪 DRY RUN MODE — Gemini scoring will be skipped\n");
  }

  console.log("\n🔍 Fetching Upwork job listings...\n");

  // 1. Fetch job listings (scraping the search page)
  let rawJobs;
  let browser;
  try {
    const result = await fetchJobUrls(config);
    rawJobs = result.jobs;
    browser = result.browser;
  } catch (err) {
    console.error(`\n❌ Search page scrape error: ${err.message}`);
    process.exit(1);
  }

  if (!rawJobs.length) {
    console.log("No jobs found. Try different keywords.");
    if (browser) await browser.close().catch(() => {});
    process.exit(0);
  }

  console.log(`\n📋 Found ${rawJobs.length} jobs. Enriching with client data...\n`);

  // 2. Enrich (sequential with rate limiting — browser is closed inside enrichAll)
  const enrichedJobs = await enrichAll(rawJobs, browser);

  // 3. Hard filters
  let filtered = enrichedJobs;

  filtered = filtered.filter((job) => {
    // Budget filter
    const budget = job.budgetAmount ?? job.budgetMin ?? null;
    if (budget !== null && budget < config.minBudget) {
      console.log(`  ⏭️  Skipping (low budget $${budget}): ${job.title.slice(0, 50)}...`);
      return false;
    }
    // Proposals filter
    const proposals = job.proposalCount ?? parseProposalCount(job.proposalsTier);
    if (proposals !== null && proposals > config.maxProposals) {
      console.log(`  ⏭️  Skipping (${proposals} proposals): ${job.title.slice(0, 50)}...`);
      return false;
    }
    return true;
  });

  if (!filtered.length) {
    console.log("\n⚠️  All jobs filtered out. Try relaxing your filters.");
    process.exit(0);
  }

  // ── Dry-run: print enriched jobs and exit ──
  if (DRY_RUN) {
    console.log("\n" + "═".repeat(50));
    console.log("  🧪  DRY RUN — ENRICHED JOBS (no Gemini scoring)");
    console.log("═".repeat(50));

    filtered.forEach((job, i) => printDryRunJob(job, i));

    const enrichedCount = filtered.filter((j) => j.enriched).length;
    console.log("\n" + "━".repeat(50));
    console.log(
      `\n📈 Summary: ${filtered.length} jobs after filtering, ` +
      `${enrichedCount} successfully enriched\n`
    );
    return;
  }

  console.log(`\n🤖 Scoring ${filtered.length} jobs with Gemini...\n`);

  // 4. Score with Gemini
  let scored;
  try {
    scored = await scoreJobs(filtered, config);
  } catch (err) {
    console.error(`\n❌ Scoring error: ${err.message}`);
    process.exit(1);
  }

  // Merge client data into scored results for display
  const merged = scored.map((s) => {
    const original = filtered.find(
      (j) => j.link === s.url || j.title === s.title
    );
    return {
      ...s,
      budget: original?.budgetAmount ?? original?.budgetMin ?? null,
      clientSpent: original?.clientTotalSpent ?? null,
      hireRate: original?.clientHireRate
        ? `${original.clientHireRate}%`
        : null,
      proposals: original?.proposalsTier ?? original?.proposalCount ?? null,
    };
  });

  // 5. Sort by score descending
  merged.sort((a, b) => (b.score || 0) - (a.score || 0));

  // 6. Print results
  console.log("\n" + "═".repeat(50));
  console.log("  📊  UPWORK JOB SCORING RESULTS");
  console.log("═".repeat(50));

  merged.forEach(printJob);

  // 7. Summary
  const bids = merged.filter((j) => j.verdict === "BID").length;
  const maybes = merged.filter((j) => j.verdict === "MAYBE").length;
  const skips = merged.filter((j) => j.verdict === "SKIP").length;

  console.log("\n" + "━".repeat(50));
  console.log(
    `\n📈 Results: 🔥 ${bids} jobs to BID, 📊 ${maybes} MAYBE, ❌ ${skips} SKIP\n`
  );
}

main();
