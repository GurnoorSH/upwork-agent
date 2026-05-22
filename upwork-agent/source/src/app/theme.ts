import { createTheme } from "@mui/material/styles";

export function createAppTheme(darkMode: boolean) {
  const darkDivider = "rgba(239, 244, 235, 0.1)";
  const lightDivider = "rgba(17, 24, 39, 0.1)";

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#32d583" : "#14a800",
        light: darkMode ? "#7ee7ad" : "#37c51f",
        dark: darkMode ? "#11a85b" : "#0f7f12",
        contrastText: darkMode ? "#06120b" : "#ffffff"
      },
      secondary: {
        main: darkMode ? "#dff8ea" : "#111827",
        contrastText: darkMode ? "#0d1110" : "#ffffff"
      },
      background: {
        default: darkMode ? "#101113" : "#f6f6f6",
        paper: darkMode ? "#17191d" : "#ffffff"
      },
      text: {
        primary: darkMode ? "#f4f7f2" : "#111827",
        secondary: darkMode ? "#aab4ad" : "#5f6b61",
        disabled: darkMode ? "rgba(244, 247, 242, 0.38)" : "rgba(17, 24, 39, 0.38)"
      },
      divider: darkMode ? darkDivider : lightDivider,
      action: darkMode
        ? {
            active: "#d7e2d8",
            hover: "rgba(50, 213, 131, 0.08)",
            selected: "rgba(50, 213, 131, 0.14)",
            disabled: "rgba(244, 247, 242, 0.32)",
            disabledBackground: "rgba(244, 247, 242, 0.08)",
            focus: "rgba(50, 213, 131, 0.18)"
          }
        : {
            hover: "rgba(20, 168, 0, 0.06)",
            selected: "rgba(20, 168, 0, 0.1)",
            focus: "rgba(20, 168, 0, 0.16)"
          },
      info: {
        main: darkMode ? "#6ecbff" : "#0290d1",
        contrastText: "#ffffff"
      },
      success: {
        main: darkMode ? "#32d583" : "#43a047",
        contrastText: darkMode ? "#06120b" : "#ffffff"
      },
      warning: {
        main: darkMode ? "#f5c451" : "#ed6c02",
        contrastText: darkMode ? "#1c1400" : "#ffffff"
      },
      error: {
        main: darkMode ? "#ff7373" : "#d32f2f",
        contrastText: "#ffffff"
      }
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
      fontWeightBold: 600,
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundAttachment: "fixed",
            colorScheme: darkMode ? "dark" : "light"
          },
          "code, pre": {
            fontFamily:
              "\"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, monospace"
          },
          "*": {
            scrollbarColor: darkMode ? "#3a403b #141619" : "#c8d0c9 #f6f6f6"
          },
          "*::-webkit-scrollbar": {
            height: 10,
            width: 10
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: darkMode ? "#3a403b" : "#c8d0c9",
            border: "2px solid transparent",
            borderRadius: 999,
            backgroundClip: "content-box"
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
          }
        }
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
            textTransform: "none"
          },
          contained: {
            boxShadow: "none"
          },
          outlined: {
            borderColor: darkMode ? "rgba(239, 244, 235, 0.18)" : undefined
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none"
          },
          outlined: {
            borderColor: darkMode ? darkDivider : lightDivider
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none"
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
            "&.MuiChip-filledDefault": {
              backgroundColor: darkMode ? "rgba(239, 244, 235, 0.08)" : "#eef2ee"
            }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.025)" : "#ffffff"
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "rgba(239, 244, 235, 0.14)" : lightDivider
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "rgba(126, 231, 173, 0.55)" : "#14a800"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#32d583" : "#14a800"
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: darkMode ? "#1d2025" : "#f7faf7",
            color: darkMode ? "#dfe8df" : "#374151",
            fontWeight: 700
          },
          root: {
            borderBottomColor: darkMode ? "rgba(239, 244, 235, 0.08)" : lightDivider
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 3,
            borderRadius: 999
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 700,
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
