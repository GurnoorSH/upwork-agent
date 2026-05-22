import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";

type JobFeedSummaryProps = {
  totalCount: number;
  unseenCount: number;
  onMarkAllSeen: () => void;
};

export function JobFeedSummary({ totalCount, unseenCount, onMarkAllSeen }: JobFeedSummaryProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        borderRadius: 1,
        display: "flex",
        gap: 2,
        justifyContent: "space-between",
        p: { xs: 2, sm: 2.5 }
      }}
    >
      <Box>
        <Typography component="h1" variant="h5">
          Jobs feed
        </Typography>
        <Typography color="text.secondary">Fresh opportunities, sorted as they arrive.</Typography>
      </Box>
      <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="flex-end">
        <Chip color="secondary" label={`${totalCount} total`} />
        <Chip color={unseenCount > 0 ? "warning" : "default"} label={`${unseenCount} new`} />
        {unseenCount > 0 ? (
          <Button onClick={onMarkAllSeen} variant="outlined">
            Mark seen
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
}
