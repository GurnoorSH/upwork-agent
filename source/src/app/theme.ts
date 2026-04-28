import { createTheme } from "@mui/material/styles";

export function createAppTheme(darkMode: boolean) {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#ffffff" : "#14a800",
        contrastText: darkMode ? "#000000" : "#ffffff"
      },
      secondary: {
        main: "#ffffff",
        contrastText: "#000000"
      },
      background: {
        default: darkMode ? "#0d1117" : "#f6f6f6",
        paper: darkMode ? "#11171f" : "#ffffff"
      },
      info: {
        main: "#0290d1",
        contrastText: "#ffffff"
      },
      success: {
        main: "#43a047",
        contrastText: "#ffffff"
      }
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      fontWeightBold: 600,
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 }
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: "2rem",
            fontWeight: 600,
            textTransform: "none"
          }
        }
      },
      MuiSkeleton: {
        styleOverrides: {
          root: { borderRadius: "0.25rem" }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: { fontSize: "0.875rem" }
        }
      }
    }
  });
}
