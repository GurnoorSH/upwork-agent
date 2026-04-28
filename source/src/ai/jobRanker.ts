import type { Job } from "../jobs/jobTypes";
import { getJobStableId } from "../jobs/jobUrls";
import { formatBudget, getProposalLabel, getSkillLabel } from "../jobs/jobFormatters";
import { rankJobsWithGemini } from "./geminiClient";
import type { AiFilterSettings, JobRankingJobInput, JobRankingResult } from "./jobRankingTypes";

export function shouldSkipAiRanking(settings: AiFilterSettings) {
  return !settings.enabled || settings.apiKey.trim().length === 0;
}

export function createUnrankedJobResults(jobs: Job[]): JobRankingResult[] {
  return jobs.map((job) => ({
    jobId: getJobStableId(job),
    selected: true,
    score: 0,
    title: job.title,
    budget: "",
    clientSummary: "",
    reasons: [],
    rejectionReason: null
  }));
}

export async function rankAndSelectJobs(jobs: Job[], settings: AiFilterSettings) {
  if (shouldSkipAiRanking(settings)) {
    return {
      selectedJobs: jobs,
      evaluatedJobIds: new Set(jobs.map(getJobStableId)),
      rankingEnabled: false
    };
  }

  const candidateJobs = jobs.filter((job) => !isDeterministicReject(job));
  if (candidateJobs.length === 0) {
    return {
      selectedJobs: [],
      evaluatedJobIds: new Set(jobs.map(getJobStableId)),
      rankingEnabled: true
    };
  }

  const results = await rankJobsWithGemini(settings, {
    jobs: candidateJobs.map(toRankingInput),
    profilePrompt: settings.profilePrompt,
    rankingPrompt: settings.rankingPrompt
  });
  const resultsById = new Map(results.map((result) => [result.jobId, result]));

  const selectedJobs: Job[] = [];
  for (const job of candidateJobs) {
    const result = resultsById.get(getJobStableId(job));
    if (!result?.selected) {
      continue;
    }

    selectedJobs.push({
      ...job,
      aiRanking: {
        selected: true,
        score: result.score,
        title: result.title,
        budget: result.budget,
        clientSummary: result.clientSummary,
        reasons: result.reasons.slice(0, 3),
        rejectionReason: null,
        rankedAt: Date.now()
      }
    });
  }

  selectedJobs.sort((a, b) => (b.aiRanking?.score ?? 0) - (a.aiRanking?.score ?? 0));

  return {
    selectedJobs,
    evaluatedJobIds: new Set(jobs.map(getJobStableId)),
    rankingEnabled: true
  };
}

function toRankingInput(job: Job): JobRankingJobInput {
  const skills = [...(job.skills ?? []), ...(job.attrs ?? [])]
    .map(getSkillLabel)
    .filter((skill): skill is string => Boolean(skill));

  return {
    jobId: getJobStableId(job),
    title: job.title,
    type: job.type,
    budget: formatBudget(job) ?? "",
    description: job.description,
    proposals: getProposalLabel(job),
    connects: typeof job.connectPrice === "number" ? job.connectPrice : null,
    skills,
    client: {
      paymentVerified: Boolean(job.client?.paymentVerificationStatus),
      rating: typeof job.client?.totalFeedback === "number" ? job.client.totalFeedback : null,
      spend: typeof job.client?.totalSpent === "number" ? job.client.totalSpent : null,
      hires: typeof job.client?.totalHires === "number" ? job.client.totalHires : null,
      postedJobs: typeof job.client?.totalPostedJobs === "number" ? job.client.totalPostedJobs : null,
      country: job.client?.location?.country ?? null
    }
  };
}

function isDeterministicReject(job: Job) {
  if (!job.title.trim() || !job.description.trim()) {
    return true;
  }

  if (job.description.trim().length < 40) {
    return true;
  }

  if (job.type === "Fixed-price") {
    const amount = parseAmount(job.amount?.amount ?? job.amount?.displayValue);
    return typeof amount === "number" && amount > 0 && amount < 50;
  }

  if (job.type === "Hourly") {
    const hourlyMax = job.hourlyBudget?.max ?? job.hourlyBudget?.min;
    return typeof hourlyMax === "number" && hourlyMax > 0 && hourlyMax < 10;
  }

  return false;
}

function parseAmount(value: string | undefined) {
  if (!value) return null;
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isNaN(parsed) ? null : parsed;
}
