import CloseIcon from "@mui/icons-material/Close";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Box, IconButton, Paper, Stack, Tooltip, Typography, alpha } from "@mui/material";
import type { KeyboardEvent } from "react";
import { formatBudget, formatJobAge } from "./jobFormatters";
import type { Job } from "./jobTypes";
import { JobCard } from "./JobCard";

type CompactJobRowProps = {
  expanded: boolean;
  job: Job;
  onOpen: (job: Job) => void;
  onToggle: () => void;
};

export function CompactJobRow({ expanded, job, onOpen, onToggle }: CompactJobRowProps) {
  if (expanded) {
    return (
      <Box sx={{ position: "relative" }}>
        <Tooltip title="Collapse">
          <IconButton
            aria-label="Collapse job"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            size="small"
            sx={(theme) => ({
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              position: "absolute",
              right: 64,
              top: 12,
              zIndex: 1,
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.08)
              }
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <JobCard job={job} onOpen={onOpen} />
      </Box>
    );
  }

  const isNew = job.__isSeen === false;
  const age = formatJobAge(job);
  const budget = formatBudget(job);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onOpen(job);
  };

  return (
    <Paper
      component="article"
      onClick={() => onOpen(job)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      variant="outlined"
      sx={(theme) => ({
        alignItems: "center",
        borderColor: isNew ? alpha(theme.palette.warning.main, 0.75) : "divider",
        borderRadius: 1,
        cursor: "pointer",
        display: "flex",
        gap: 1,
        minHeight: 68,
        p: 1.5,
        transition: "border-color 150ms ease, background-color 150ms ease",
        "&:hover": {
          bgcolor: "action.hover",
          borderColor: "primary.main"
        }
      })}
    >
      <Tooltip title="Expand">
        <IconButton
          aria-label="Expand job"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          size="small"
        >
          <UnfoldMoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Box sx={{ minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 700 }}>
          {job.title}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.75}>
          {[job.type, budget, age].filter(Boolean).map((item) => (
            <Typography color="text.secondary" key={item} variant="body2">
              {item}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
