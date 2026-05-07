import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useAppState } from "../AppStateContext";
import type { LogEntry, LogLevel, RequestLogEntry } from "../../logs/logTypes";

export function LogsPage() {
  const { logs, reloadStorage } = useAppState();
  const [tab, setTab] = useState<"events" | "requests">("events");

  return (
    <Stack spacing={2}>
      <Box sx={{ alignItems: "center", display: "flex", gap: 2, justifyContent: "space-between" }}>
        <Box>
          <Typography component="h1" variant="h4">
            Logs
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Fetch, ranking, storage, and network diagnostics from <code>local:__LOGS</code>.
          </Typography>
        </Box>
        <Button startIcon={<RefreshIcon />} onClick={() => void reloadStorage()} variant="outlined">
          Reload
        </Button>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        <Chip color="primary" label={`${logs.logs.length} events`} />
        <Chip color="secondary" label={`${logs.requests.length} requests`} />
        <Chip label="Newest first" />
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 1, overflow: "hidden" }}>
        <Tabs
          value={tab}
          onChange={(_, nextTab) => setTab(nextTab)}
          sx={{ borderBottom: 1, borderColor: "divider", px: 1 }}
        >
          <Tab label="Events" value="events" />
          <Tab label="Requests" value="requests" />
        </Tabs>

        {tab === "events" ? <EventsTable logs={logs.logs} /> : <RequestsTable requests={logs.requests} />}
      </Paper>
    </Stack>
  );
}

function EventsTable({ logs }: { logs: LogEntry[] }) {
  if (logs.length === 0) {
    return <EmptyLogMessage message="No event logs yet. Wait for a fetch cycle or reload the extension." />;
  }

  return (
    <TableContainer sx={{ maxHeight: 560 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 156 }}>Time</TableCell>
            <TableCell sx={{ width: 96 }}>Level</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Context</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} hover>
              <TableCell>{formatDate(log.createdAt)}</TableCell>
              <TableCell>
                <Chip color={getLevelColor(log.level)} label={log.level} size="small" />
              </TableCell>
              <TableCell sx={{ minWidth: 260 }}>{log.message}</TableCell>
              <TableCell>
                <JsonBlock value={log.context} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function RequestsTable({ requests }: { requests: RequestLogEntry[] }) {
  if (requests.length === 0) {
    return <EmptyLogMessage message="No request logs yet. Trigger a fetch cycle, then press Reload." />;
  }

  return (
    <TableContainer sx={{ maxHeight: 560 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 156 }}>Time</TableCell>
            <TableCell sx={{ width: 92 }}>Method</TableCell>
            <TableCell>URL</TableCell>
            <TableCell sx={{ width: 96 }}>Status</TableCell>
            <TableCell sx={{ width: 120 }}>Duration</TableCell>
            <TableCell>Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} hover>
              <TableCell>{formatDate(request.createdAt)}</TableCell>
              <TableCell>{request.method}</TableCell>
              <TableCell sx={{ maxWidth: 360, overflowWrap: "anywhere" }}>{request.url}</TableCell>
              <TableCell>
                <Chip
                  color={request.ok ? "success" : request.status ? "error" : "warning"}
                  label={request.status ?? "ERR"}
                  size="small"
                />
              </TableCell>
              <TableCell>{request.durationMs == null ? "-" : `${Math.round(request.durationMs)} ms`}</TableCell>
              <TableCell sx={{ maxWidth: 300, overflowWrap: "anywhere" }}>
                {request.error && <Typography variant="body2">{request.error}</Typography>}
                {request.responseBody && (
                  <Box sx={{ mt: request.error ? 1 : 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                      Response Body:
                    </Typography>
                    <JsonBlock value={request.responseBody} />
                  </Box>
                )}
                {!request.error && !request.responseBody && "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function EmptyLogMessage({ message }: { message: string }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

function JsonBlock({ value }: { value: unknown }) {
  if (!value || (typeof value === "object" && Object.keys(value).length === 0)) {
    return <Typography color="text.secondary">-</Typography>;
  }

  let displayValue = value;
  if (typeof value === "string") {
    try {
      displayValue = JSON.parse(value);
    } catch {
      // Keep as raw string if not JSON
    }
  }

  return (
    <Box
      component="pre"
      sx={{
        bgcolor: "action.hover",
        borderRadius: 1,
        fontSize: 12,
        m: 0,
        maxHeight: 140,
        overflow: "auto",
        p: 1,
        whiteSpace: "pre-wrap"
      }}
    >
      {typeof displayValue === "string" ? displayValue : JSON.stringify(displayValue, null, 2)}
    </Box>
  );
}

function getLevelColor(level: LogLevel) {
  switch (level) {
    case "error":
      return "error";
    case "warn":
      return "warning";
    case "info":
      return "info";
    default:
      return "default";
  }
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    month: "short",
    day: "numeric"
  }).format(value);
}
