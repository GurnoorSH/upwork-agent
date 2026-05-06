import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha
} from "@mui/material";
import type { MouseEvent } from "react";
import { formatBudget, formatClientSpend, formatJobAge, getProposalLabel, getSkillLabel } from "./jobFormatters";
import type { Job } from "./jobTypes";

type JobCardProps = {
  job: Job;
  onOpen: (job: Job) => void;
};

export function JobCard({ job, onOpen }: JobCardProps) {
  const isNew = job.__isSeen === false;
  const age = formatJobAge(job);
  const budget = formatBudget(job);
  const proposals = getProposalLabel(job);
  const spend = formatClientSpend(job.client?.totalSpent);
  const location = job.client?.location?.country;
  const skills = [...(job.skills ?? []), ...(job.attrs ?? [])]
    .map(getSkillLabel)
    .filter((label): label is string => Boolean(label))
    .slice(0, 12);

  const openJob = (event: MouseEvent) => {
    event.preventDefault();
    onOpen(job);
  };

  return (
    <Paper
      component="article"
      onClick={() => onOpen(job)}
      tabIndex={0}
      variant="outlined"
      sx={(theme) => ({
        borderColor: isNew ? alpha(theme.palette.warning.main, 0.75) : "divider",
        borderRadius: 1,
        cursor: "pointer",
        overflow: "hidden",
        p: { xs: 2, sm: 2.25 },
        transition: "border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: theme.shadows[3],
          transform: "translateY(-1px)"
        }
      })}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" gap={1} justifyContent="space-between">
          <Box sx={{ minWidth: 0 }}>
            <Stack alignItems="center" direction="row" gap={1}>
              {isNew ? <Chip color="warning" label="New" size="small" /> : null}
              {job.aiRanking ? (
                <Chip
                  color="success"
                  icon={<AutoAwesomeIcon />}
                  label={`${job.aiRanking.score}/10 match`}
                  size="small"
                />
              ) : null}
              <Typography component="h2" sx={{ fontWeight: 700 }} variant="subtitle1">
                {job.title}
              </Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ fontWeight: 600, mt: 0.5 }} variant="body2">
              {[job.type, job.tierText ?? job.tierLabel, budget ? `Est. budget: ${budget}` : null, age]
                .filter(Boolean)
                .join(" | ")}
            </Typography>
          </Box>
          <Tooltip title="Open job">
            <Button
              aria-label="Open job"
              onClick={openJob}
              size="small"
              sx={{ flex: "0 0 auto", minWidth: 36 }}
              variant="outlined"
            >
              <OpenInNewIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Stack>

        <Typography
          sx={{
            whiteSpace: "pre-line",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 8,
            overflow: "hidden"
          }}
          variant="body2"
        >
          {job.description}
        </Typography>

        {job.aiRanking?.reasons.length ? (
          <Box
            sx={{
              bgcolor: "action.hover",
              borderRadius: 1,
              p: 1.25
            }}
          >
            <Stack direction="row" alignItems="center" gap={0.75} sx={{ mb: 0.5 }}>
              <AutoAwesomeIcon color="success" fontSize="small" />
              <Typography fontWeight={700} variant="body2">
                Why this is a good lead
              </Typography>
            </Stack>
            <Stack component="ul" spacing={0.25} sx={{ m: 0, pl: 2.5 }}>
              {job.aiRanking.reasons.slice(0, 3).map((reason) => (
                <Typography component="li" key={reason} variant="body2">
                  {reason}
                </Typography>
              ))}
            </Stack>
          </Box>
        ) : null}

        {skills.length > 0 ? (
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" />
            ))}
          </Stack>
        ) : null}

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {proposals ? <Chip label={`Proposals: ${proposals}`} size="small" /> : null}
          {typeof job.connectPrice === "number" ? (
            <Chip label={`${job.connectPrice} connects`} size="small" />
          ) : null}
        </Stack>

        <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1.25}>
          {job.client?.paymentVerificationStatus ? (
            <Stack alignItems="center" direction="row" gap={0.5}>
              <CheckCircleIcon color="info" fontSize="small" />
              <Typography fontWeight={600} variant="body2">
                Payment verified
              </Typography>
            </Stack>
          ) : null}
          {typeof job.client?.totalFeedback === "number" ? (
            <Stack alignItems="center" direction="row" gap={0.25}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  color={star <= Math.round(job.client?.totalFeedback ?? 0) ? "warning" : "disabled"}
                  fontSize="small"
                  key={star}
                />
              ))}
            </Stack>
          ) : null}
          {spend ? <Typography color="text.secondary">{spend}</Typography> : null}
          {location ? (
            <Stack alignItems="center" direction="row" gap={0.25}>
              <LocationOnIcon color="error" fontSize="small" />
              <Typography color="text.secondary">{location}</Typography>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Paper>
  );
}
