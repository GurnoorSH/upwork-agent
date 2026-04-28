import { Chip, Stack, Typography } from "@mui/material";
import { useAppState } from "../AppStateContext";
import { PlaceholderPage } from "./PlaceholderPage";

export function LogsPage() {
  const { logs } = useAppState();

  return (
    <PlaceholderPage title="Logs" compiledSymbol="pH">
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <Chip label={`${logs.logs.length} logs`} />
        <Chip label={`${logs.requests.length} request logs`} />
        <Chip label="local:__LOGS" color="primary" />
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        The typed logs store is available; the full logs UI will be rebuilt in a later phase.
      </Typography>
    </PlaceholderPage>
  );
}
