import type { Job } from "../jobs/jobTypes";
import { getJobStableId } from "../jobs/jobUrls";
import { formatBudget, getProposalLabel, getSkillLabel } from "../jobs/jobFormatters";
import { rankJobsWithAigen } from "./aigenBridgeClient";
import { rankJobsWithGroq } from "./groqClient";
import { safeAppendLog } from "../logs/safeLogger";
import { wait } from "../shared/utils";
import type { AiFilterSettings, JobRankingInput, JobRankingJobInput, JobRankingResult } from "./jobRankingTypes";

const GROQ_RANKING_BATCH_SIZE = 4;
const GROQ_BATCH_DELAY_MS = 2200;

export function shouldSkipAiRanking(settings: AiFilterSettings) {
  if (!settings.enabled) return true;
  if (settings.provider === "groq") return settings.groqApiKey.trim().length === 0;
  return settings.bridgeUrl.trim().length === 0;
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

export async function rankAndSelectJobs(jobs: Job[], settings: AiFilterSettings, existingJobs: Job[] = []) {
  if (shouldSkipAiRanking(settings)) {
    await safeAppendLog("debug", "Skipped AI ranking.", {
      reason: getSkipReason(settings),
      inputCount: jobs.length
    });
    return {
      selectedJobs: jobs,
      evaluatedJobIds: new Set(jobs.map(getJobStableId)),
      rankingEnabled: false
    };
  }

  const existingById = new Map(existingJobs.map((job) => [getJobStableId(job), job]));
  const cachedSelectedJobs: Job[] = [];
  const candidateJobs = jobs.filter((job) => {
    if (isDeterministicReject(job)) {
      return false;
    }

    const cached = existingById.get(getJobStableId(job));
    if (cached?.aiRanking?.selected === true) {
      cachedSelectedJobs.push({
        ...job,
        aiRanking: cached.aiRanking
      });
      return false;
    }

    return true;
  });

  if (candidateJobs.length === 0) {
    await safeAppendLog("info", "Skipped AI ranking because no newly rankable jobs were found.", {
      inputCount: jobs.length,
      cachedSelectedCount: cachedSelectedJobs.length
    });
    return {
      selectedJobs: cachedSelectedJobs,
      evaluatedJobIds: new Set(jobs.map(getJobStableId)),
      rankingEnabled: true
    };
  }

  const rankingInput = {
    jobs: candidateJobs.map(toRankingInput),
    profilePrompt: settings.profilePrompt,
    rankingPrompt: settings.rankingPrompt
  };
  const results = await rankJobsWithSelectedProvider(settings, rankingInput);
  const resultsById = new Map(results.map((result) => [result.jobId, result]));

  const selectedJobs: Job[] = [...cachedSelectedJobs];
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
  await safeAppendLog("info", "AI ranking completed.", {
    inputCount: jobs.length,
    cachedSelectedCount: cachedSelectedJobs.length,
    candidateCount: candidateJobs.length,
    resultCount: results.length,
    selectedCount: selectedJobs.length,
    rejectedCount: candidateJobs.length - selectedJobs.length
  });

  return {
    selectedJobs,
    evaluatedJobIds: new Set(jobs.map(getJobStableId)),
    rankingEnabled: true
  };
}

async function rankJobsWithSelectedProvider(
  settings: AiFilterSettings,
  input: JobRankingInput
): Promise<JobRankingResult[]> {
  if (settings.provider !== "groq") {
    return rankJobsWithAigen(settings, input);
  }

  const batches = chunk(input.jobs, GROQ_RANKING_BATCH_SIZE);
  if (batches.length > 1) {
    await safeAppendLog("info", "Ranking jobs with Groq in smaller batches.", {
      batchCount: batches.length,
      batchSize: GROQ_RANKING_BATCH_SIZE,
      jobCount: input.jobs.length
    });
  }

  const results: JobRankingResult[] = [];
  for (const [index, jobs] of batches.entries()) {
    if (index > 0) {
      await wait(GROQ_BATCH_DELAY_MS);
    }

    const batchResults = await rankJobsWithGroq(settings, {
      ...input,
      jobs
    });
    results.push(...batchResults);
  }

  return results;
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function getSkipReason(settings: AiFilterSettings) {
  if (!settings.enabled) return "disabled";
  return settings.provider === "groq" ? "missing_groq_api_key" : "missing_bridge_url";
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
