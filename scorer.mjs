/**
 * Google Gemini AI Scoring Module
 *
 * Sends enriched job listings to Gemini for intelligent scoring,
 * ranking, and personalized proposal opener generation.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Build the system instruction for Gemini.
 * @param {object} config
 * @returns {string}
 */
function buildSystemInstruction(config) {
  return `You are a freelance bidding assistant. Score jobs for a freelancer with this profile:

${config.myProfile}

Scoring instructions: ${config.scoringCriteria}

Preferred client countries: ${config.preferredCountries.join(", ")}
Minimum budget: $${config.minBudget}
Maximum acceptable proposals: ${config.maxProposals}

For each job return a JSON array (no markdown, no code fences, raw JSON only) with objects:
{
  "title": string,
  "url": string,
  "score": number (1-10),
  "reasons": string[] (2-3 bullet points why to bid or not),
  "redFlags": string[] (any concerns, empty array if none),
  "proposalOpener": string (1-2 sentence personalized opener for a cover letter),
  "verdict": "BID" | "MAYBE" | "SKIP"
}

Scoring Rules (you MUST follow these):
- score >= 7 → verdict must be "BID"
- score 5-6 → verdict must be "MAYBE"
- score < 5 → verdict must be "SKIP"
- If client total spend is $0 or null/unknown → score max 4 (cannot exceed 4)
- If proposals > 20 → penalize 2 points from the base score
- If client country is in the preferred countries list → bonus 1 point
- If budget is below the minimum budget → verdict must be "SKIP" regardless of score

Return ONLY the JSON array. No explanation, no markdown formatting.`;
}

/**
 * Score enriched jobs using Google Gemini.
 *
 * @param {Array<object>} enrichedJobs - Array of enriched job objects
 * @param {object} config - User config
 * @returns {Promise<Array<object>>} Array of scored job objects
 */
export async function scoreJobs(enrichedJobs, config) {
  if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === "your_key_here") {
    throw new Error("GOOGLE_API_KEY is not set. Please add your key to the .env file.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: buildSystemInstruction(config),
  });

  const jobSummaries = enrichedJobs.map((job) => ({
    title: job.title,
    url: job.link,
    description: (job.fullDescription || job.description || "No description").slice(0, 1500),
    budget: job.budgetAmount ?? job.budgetMin ?? job.budgetMax ?? "Not specified",
    budgetRange: job.budgetMin && job.budgetMax ? `$${job.budgetMin} - $${job.budgetMax}` : null,
    clientTotalSpent: job.clientTotalSpent ?? "Unknown",
    clientTotalHires: job.clientTotalHires ?? "Unknown",
    clientHireRate: job.clientHireRate ? `${job.clientHireRate}%` : "Unknown",
    clientRating: job.clientScore ?? "Unknown",
    clientReviews: job.clientReviewsCount ?? "Unknown",
    clientCountry: job.clientCountry ?? "Unknown",
    proposals: job.proposalsTier ?? job.proposalCount ?? "Unknown",
    contractorTier: job.contractorTier ?? "Not specified",
    weeklyHours: job.weeklyHours ?? "Not specified",
    enriched: job.enriched ?? false,
    pubDate: job.pubDate,
  }));

  const userPrompt = `Here are the jobs to score:\n\n${JSON.stringify(jobSummaries, null, 2)}`;
  console.log("  Sending to Gemini 2.0 Flash...");

  const result = await model.generateContent(userPrompt);
  const responseText = result.response.text().trim();

  // Strip markdown code fences if Gemini wraps them
  let cleaned = responseText;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  try {
    const scored = JSON.parse(cleaned);
    if (!Array.isArray(scored)) throw new Error("Gemini response is not a JSON array.");
    return scored;
  } catch (parseErr) {
    console.error("\n❌ Failed to parse Gemini response as JSON.");
    console.error("Raw response (first 500 chars):", cleaned.slice(0, 500));
    throw new Error(`Gemini response parsing failed: ${parseErr.message}`);
  }
}
