import type { Job } from "./jobTypes";

const UPWORK_BASE_URL = "https://www.upwork.com";

export function getJobStableId(job: Job) {
  return job.uid ?? job.id ?? job.ciphertext ?? String(job.recno ?? job.title);
}

export function getJobViewUrl(job: Job) {
  return `${UPWORK_BASE_URL}/jobs/${getUpworkJobToken(job.ciphertext)}`;
}

export function getJobProposalUrl(job: Job) {
  return `${UPWORK_BASE_URL}/nx/proposals/job/${getUpworkJobToken(job.ciphertext)}/apply`;
}

function getUpworkJobToken(ciphertext: string) {
  return `~${ciphertext.replace(/^~+/, "")}`;
}
