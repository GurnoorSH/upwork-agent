import type { Job } from "../jobs/jobTypes";

export type AiFilterSettings = {
  enabled: boolean;
  provider: "aigen-local";
  bridgeUrl: string;
  bridgeToken: string;
  platform: "gemini" | "chatgpt" | "claude" | "perplexity";
  model: string;
  profilePrompt: string;
  rankingPrompt: string;
};

export type JobRankingInput = {
  jobs: JobRankingJobInput[];
  profilePrompt: string;
  rankingPrompt: string;
};

export type JobRankingJobInput = {
  jobId: string;
  title: string;
  type: Job["type"];
  budget: string;
  description: string;
  proposals: string | null;
  connects: number | null;
  skills: string[];
  client: {
    paymentVerified: boolean;
    rating: number | null;
    spend: number | null;
    hires: number | null;
    postedJobs: number | null;
    country: string | null;
  };
};

export type JobRankingResult = {
  jobId: string;
  selected: boolean;
  score: number;
  title: string;
  budget: string;
  clientSummary: string;
  reasons: string[];
  rejectionReason: string | null;
};
