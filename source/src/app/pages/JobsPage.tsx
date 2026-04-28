import { Alert, Box, FormControlLabel, Stack, Switch } from "@mui/material";
import { useAppState } from "../AppStateContext";
import { EmptyJobsState } from "../../jobs/EmptyJobsState";
import { JobFeedSummary } from "../../jobs/JobFeedSummary";
import { JobList } from "../../jobs/JobList";
import { getJobProposalUrl, getJobStableId, getJobViewUrl } from "../../jobs/jobUrls";
import type { Job } from "../../jobs/jobTypes";
import { mockJobs } from "../../jobs/mockJobs";
import type { GlobalState } from "../../storage/globalState";

export function JobsPage() {
  const { globalState, jobs, saveGlobalState, saveJobs } = useAppState();
  const unseenCount = jobs.filter((job) => job.__isSeen === false).length;
  const cycleAlert = getCycleAlert(globalState.lastCycleError);

  const markAllSeen = () => {
    void saveJobs(jobs.map((job) => ({ ...job, __isSeen: true })));
  };

  const markJobSeen = async (job: Job) => {
    const jobId = getJobStableId(job);
    await saveJobs(
      jobs.map((storedJob) =>
        getJobStableId(storedJob) === jobId ? { ...storedJob, __isSeen: true } : storedJob
      )
    );
  };

  const openJob = async (job: Job) => {
    await markJobSeen(job);

    if (globalState.openProposalPage) {
      await browser.tabs.create({ active: false, url: getJobProposalUrl(job) });
    }

    await browser.tabs.create({ active: true, url: getJobViewUrl(job) });
  };

  return (
    <Stack spacing={2}>
      <JobFeedSummary totalCount={jobs.length} unseenCount={unseenCount} onMarkAllSeen={markAllSeen} />

      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={globalState.compactList}
              onChange={(_, compactList) => void saveGlobalState({ compactList })}
            />
          }
          label="Compact list"
        />
      </Box>

      {!globalState.enabled ? (
        <Alert severity="warning">Notifications are disabled. The feed can display stored jobs, but new job alerts will stay off.</Alert>
      ) : null}

      {cycleAlert ? <Alert severity={cycleAlert.severity}>{cycleAlert.message}</Alert> : null}

      {jobs.length === 0 ? (
        <EmptyJobsState onSeedMockJobs={() => void saveJobs(mockJobs)} />
      ) : (
        <JobList compact={globalState.compactList} jobs={jobs} onOpen={(job) => void openJob(job)} />
      )}
    </Stack>
  );
}

function getCycleAlert(error: GlobalState["lastCycleError"]) {
  switch (error) {
    case "UNAUTHENTICATED":
      return {
        severity: "error" as const,
        message: "Upwork login is required before the extension can fetch new jobs."
      };
    case "FORBIDDEN":
      return {
        severity: "error" as const,
        message: "Upwork blocked the last fetch attempt. Captcha or session verification may be required."
      };
    case "SERVER_ERROR":
      return {
        severity: "warning" as const,
        message: "Upwork returned a server error during the last fetch cycle."
      };
    case "NETWORK_ERROR":
      return {
        severity: "warning" as const,
        message: "The last fetch cycle could not reach Upwork."
      };
    case "OTHER":
      return {
        severity: "info" as const,
        message: "The last fetch cycle ended with an uncategorized error."
      };
    default:
      return null;
  }
}
