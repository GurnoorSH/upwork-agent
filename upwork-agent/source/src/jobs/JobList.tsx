import { Stack } from "@mui/material";
import { useState } from "react";
import { getJobStableId } from "./jobUrls";
import type { Job } from "./jobTypes";
import { CompactJobRow } from "./CompactJobRow";
import { JobCard } from "./JobCard";

type JobListProps = {
  compact: boolean;
  jobs: Job[];
  onOpen: (job: Job) => void;
};

export function JobList({ compact, jobs, onOpen }: JobListProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  return (
    <Stack spacing={1}>
      {jobs.map((job) => {
        const id = getJobStableId(job);
        if (!compact) {
          return <JobCard job={job} key={id} onOpen={onOpen} />;
        }

        return (
          <CompactJobRow
            expanded={expandedIds.has(id)}
            job={job}
            key={id}
            onOpen={onOpen}
            onToggle={() =>
              setExpandedIds((current) => {
                const next = new Set(current);
                if (next.has(id)) {
                  next.delete(id);
                } else {
                  next.add(id);
                }
                return next;
              })
            }
          />
        );
      })}
    </Stack>
  );
}
