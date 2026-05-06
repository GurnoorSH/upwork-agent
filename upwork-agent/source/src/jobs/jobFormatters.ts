import { formatDistanceToNowStrict, isValid, parseISO } from "date-fns";
import type { Job } from "./jobTypes";

export function formatJobAge(job: Job) {
  const value = job.renewedOn ?? job.publishedOn ?? job.createdOn;
  if (!value) return null;

  const date = typeof value === "string" ? parseISO(value) : new Date(value);
  if (!isValid(date)) return null;

  return `${formatDistanceToNowStrict(date, { addSuffix: true })}`;
}

export function formatBudget(job: Job) {
  if (job.type === "Hourly" && job.hourlyBudget) {
    return `$${job.hourlyBudget.min}-${job.hourlyBudget.max}/hr`;
  }

  const displayValue = job.amount?.displayValue ?? job.amount?.amount;
  if (!displayValue) return null;

  return displayValue.startsWith("$") ? displayValue : `$${displayValue}`;
}

export function formatClientSpend(totalSpent?: number) {
  if (typeof totalSpent !== "number" || Number.isNaN(totalSpent)) return null;

  if (totalSpent >= 1000) {
    return `$${Math.round(totalSpent / 100) / 10}K spent`;
  }

  return `$${totalSpent} spent`;
}

export function getSkillLabel(skill: { prettyName?: string; prefLabel?: string; name?: string }) {
  return skill.prettyName ?? skill.prefLabel ?? skill.name ?? null;
}

export function getProposalLabel(job: Job) {
  return job.proposalsTier ?? (job.totalApplicants ? `${job.totalApplicants} applicants` : null);
}
