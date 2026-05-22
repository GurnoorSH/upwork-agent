import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  AppBar,
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  alpha
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Jobs", to: "/" },
  { label: "AI filter", to: "/filters" },
  { label: "Cover letter", to: "/cover-letter" },
  { label: "Settings", to: "/settings" },
  { label: "Debug", to: "/debug" },
  { label: "Logs", to: "/logs" }
] as const;

export function OptionsLayout() {
  const location = useLocation();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar
        elevation={0}
        position="fixed"
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.86 : 0.94),
          borderBottom: 1,
          borderColor: "divider",
          backdropFilter: "blur(18px)",
          color: "text.primary"
        })}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Button
              component={NavLink}
              to="/"
              color="inherit"
              startIcon={<WorkOutlineIcon />}
              sx={{
                alignSelf: "stretch",
                borderRadius: 0,
                color: "text.primary",
                px: 0
              }}
            >
              Upwork Toolkit
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 2, pb: 3 }}>
        <Box sx={{ display: { xs: "block", md: "flex" }, gap: 2 }}>
          <Box
            component="nav"
            sx={{
              flex: "0 0 180px",
              mb: { xs: 2, md: 0 },
              position: { md: "sticky" },
              top: { md: 80 },
              alignSelf: "flex-start"
            }}
          >
            <List dense>
              {NAV_ITEMS.map((item) => (
                <ListItemButton
                  key={item.to}
                  component={NavLink}
                  selected={location.pathname === item.to}
                  to={item.to}
                  sx={(theme) => ({
                    borderRadius: 1,
                    mb: 0.5,
                    px: 1.5,
                    "&.Mui-selected": {
                      bgcolor: "action.selected",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                          : "none"
                    },
                    "&.Mui-selected:hover": {
                      bgcolor: "action.selected"
                    }
                  })}
                >
                  <ListItemText
                    primary={
                      <Typography
                        color={location.pathname === item.to ? "primary.main" : "text.secondary"}
                        fontWeight={600}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
