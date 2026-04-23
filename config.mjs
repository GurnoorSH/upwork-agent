/**
 * User Configuration for Upwork Job Scoring Agent
 *
 * Customize these settings to match your freelancing profile,
 * preferred job types, and scoring preferences.
 */

const config = {
  // Search keywords — each will be joined with '+' in the RSS query
  keywords: ["react", "nextjs", "dotnet"],

  // Job type filter: "fixed" | "hourly" | "both"
  jobType: "both",

  // Minimum budget in USD — jobs below this are filtered out
  minBudget: 300,

  // Maximum number of proposals — skip overly competitive listings
  maxProposals: 20,

  // Preferred client countries — jobs from these countries get a scoring bonus
  preferredCountries: [
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
  ],

  // Your freelancer profile — used by Claude to personalize scoring
  myProfile:
    "Full-stack developer with 1 year experience. Stack: .NET Core, React, " +
    "Next.js, JavaScript, Entity Framework. Based in India.",

  // Natural language scoring instructions for Claude
  scoringCriteria:
    "Prioritize jobs that match my tech stack closely. " +
    "Favor clients with verified payment methods and good hire rates. " +
    "Penalize vague job descriptions and unrealistic deadlines. " +
    "Give bonus points to projects with clear requirements and smaller proposal counts. " +
    "Prefer fixed-price projects with well-defined scope over open-ended hourly work.",
};

export default config;
