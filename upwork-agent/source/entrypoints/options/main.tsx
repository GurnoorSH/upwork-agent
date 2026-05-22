import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { App } from "../../src/app/App";
import { AppStateProvider, useAppState } from "../../src/app/AppStateContext";
import { createAppTheme } from "../../src/app/theme";
import "../../src/styles/global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Options root element was not found");
}

function ThemedOptionsApp() {
  const { globalState } = useAppState();
  const prefersSystemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersDark =
    globalState.darkMode === "true" ||
    (globalState.darkMode === "system" && prefersSystemDark);

  return (
    <ThemeProvider theme={createAppTheme(prefersDark)}>
      <CssBaseline />
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  );
}

createRoot(root).render(
  <React.StrictMode>
    <AppStateProvider>
      <ThemedOptionsApp />
    </AppStateProvider>
  </React.StrictMode>
);
