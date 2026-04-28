import { getJobs as fetchUpworkJobs } from "../graphql/upworkClient";
import { rankAndSelectJobs } from "../ai/jobRanker";
import { getJobs as getStoredJobs, setJobs } from "../jobs/jobsStorage";
import { getJobStableId } from "../jobs/jobUrls";
import type { Job } from "../jobs/jobTypes";
import { appendLog } from "../logs/logStorage";
import { showBasicNotification } from "../notifications/notifications";
import { getAiFilterSettings } from "../storage/aiFilterSettings";
import { getGlobalState, patchGlobalState } from "../storage/globalState";
import { setDisabledBadge, setUnseenJobsBadge } from "./badge";
import { classifyCycleError, getErrorMessage } from "./errorClassification";
import { shouldNotifyNow } from "./schedule";

const FETCH_DEBOUNCE_MS = 30_000;
const MAX_STORED_JOBS = 50;

export async function runFetchJobsCycle(now = Date.now()) {
  const state = await getGlobalState();

  if (state.lastCycleStartedAt && now - state.lastCycleStartedAt < FETCH_DEBOUNCE_MS) {
    await appendLog(createLog("debug", "Skipped fetch cycle because another cycle started recently."));
    return;
  }

  await patchGlobalState({ lastCycleStartedAt: now });

  if (!state.enabled) {
    await setDisabledBadge();
    await appendLog(createLog("info", "Skipped fetch cycle because notifications are disabled."));
    return;
  }

  try {
    const [storedJobs, fetchedJobs] = await Promise.all([
      getStoredJobs(),
      fetchUpworkJobs(state.feedType)
    ]);
    const aiFilterSettings = await getAiFilterSettings();
    let rankedFetchedJobs: Awaited<ReturnType<typeof rankAndSelectJobs>>;

    try {
      rankedFetchedJobs = await rankAndSelectJobs(fetchedJobs, aiFilterSettings);
    } catch (rankingError) {
      const unseenCount = storedJobs.filter((job) => job.__isSeen === false).length;
      await setUnseenJobsBadge(unseenCount);
      await patchGlobalState({ lastCycleError: null, lastCycleStartedAt: now });
      await appendLog(
        createLog("error", "Gemini ranking failed; preserved previous jobs feed.", {
          error: getErrorMessage(rankingError),
          fetchedCount: fetchedJobs.length,
          storedCount: storedJobs.length
        })
      );
      return;
    }

    const { jobs, newJobs } = mergeJobs(
      storedJobs,
      rankedFetchedJobs.selectedJobs,
      rankedFetchedJobs.evaluatedJobIds,
      rankedFetchedJobs.rankingEnabled
    );
    const unseenCount = jobs.filter((job) => job.__isSeen === false).length;

    await setJobs(jobs);
    await patchGlobalState({ lastCycleError: null, lastCycleStartedAt: now });
    await setUnseenJobsBadge(unseenCount);

    if (newJobs.length > 0 && shouldNotifyNow(state)) {
      await showBasicNotification(
        "New Upwork jobs",
        `${newJobs.length} new ${newJobs.length === 1 ? "job" : "jobs"} found.`
      );
    }

    await appendLog(
      createLog("info", "Fetch cycle completed.", {
        fetchedCount: fetchedJobs.length,
        selectedCount: rankedFetchedJobs.selectedJobs.length,
        aiRankingEnabled: rankedFetchedJobs.rankingEnabled,
        newCount: newJobs.length,
        storedCount: jobs.length,
        unseenCount
      })
    );
  } catch (error) {
    const lastCycleError = classifyCycleError(error);
    await patchGlobalState({ lastCycleError, lastCycleStartedAt: now });
    await appendLog(
      createLog("error", "Fetch cycle failed.", {
        error: getErrorMessage(error),
        lastCycleError
      })
    );

    if (lastCycleError === "UNAUTHENTICATED") {
      await showBasicNotification("Upwork login required", "Sign in to Upwork to resume job alerts.");
    }
  }
}

function mergeJobs(
  existingJobs: Job[],
  fetchedJobs: Job[],
  evaluatedFetchedIds: Set<string>,
  aiRankingEnabled: boolean
) {
  const existingById = new Map(existingJobs.map((job) => [getJobStableId(job), job]));
  const newJobs: Job[] = [];
  const mergedFetchedJobs = fetchedJobs.map((job) => {
    const id = getJobStableId(job);
    const existing = existingById.get(id);

    if (existing) {
      return { ...existing, ...job, __isSeen: existing.__isSeen };
    }

    const newJob = { ...job, __isSeen: false };
    newJobs.push(newJob);
    return newJob;
  });

  const fetchedIds = new Set(mergedFetchedJobs.map(getJobStableId));
  const olderJobs = existingJobs.filter((job) => {
    const id = getJobStableId(job);

    if (fetchedIds.has(id)) {
      return false;
    }

    if (aiRankingEnabled && evaluatedFetchedIds.has(id)) {
      return false;
    }

    if (aiRankingEnabled && job.aiRanking?.selected !== true) {
      return false;
    }

    return true;
  });

  return {
    jobs: [...mergedFetchedJobs, ...olderJobs].slice(0, MAX_STORED_JOBS),
    newJobs
  };
}

function createLog(level: "debug" | "info" | "error", message: string, context?: Record<string, unknown>) {
  return {
    id: crypto.randomUUID(),
    level,
    message,
    createdAt: Date.now(),
    context
  };
}
