import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

type EmptyJobsStateProps = {
  onSeedMockJobs: () => void;
};

export function EmptyJobsState({ onSeedMockJobs }: EmptyJobsStateProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        alignItems: "center",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 300,
        justifyContent: "center",
        p: 4,
        textAlign: "center"
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          bgcolor: "action.hover",
          borderRadius: "50%",
          display: "flex",
          height: 72,
          justifyContent: "center",
          mb: 2,
          width: 72
        }}
      >
        <WorkOutlineIcon color="primary" fontSize="large" />
      </Box>
      <Typography component="h2" variant="h5">
        Sit back and relax
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420 }}>
        Extension will notify you when new jobs appear.
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
        <Button onClick={onSeedMockJobs} variant="outlined">
          Load mock jobs
        </Button>
      </Stack>
    </Paper>
  );
}
