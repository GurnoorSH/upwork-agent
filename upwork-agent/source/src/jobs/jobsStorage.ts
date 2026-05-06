import { storage } from "@wxt-dev/storage";
import type { Job } from "./jobTypes";
import { migrateJobs } from "../storage/migrations";
import { storageKeys } from "../storage/keys";

export const jobsStorage = storage.defineItem<Job[]>(storageKeys.JOBS, {
  version: 1,
  fallback: [],
  migrations: {
    1: migrateJobs
  }
});

export async function getJobs() {
  return migrateJobs(await jobsStorage.getValue());
}

export async function setJobs(jobs: Job[]) {
  await jobsStorage.setValue(migrateJobs(jobs));
}
