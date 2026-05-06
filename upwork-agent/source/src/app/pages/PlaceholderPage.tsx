import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type PlaceholderPageProps = {
  title: string;
  compiledSymbol?: string;
  children?: ReactNode;
};

export function PlaceholderPage({ title, children }: PlaceholderPageProps) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      {children ? <Box sx={{ mt: 2 }}>{children}</Box> : null}
    </Paper>
  );
}
