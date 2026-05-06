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
  Typography
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
    <Box>
      <AppBar elevation={0} position="fixed" sx={{ bgcolor: "#000000" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Button
              component={NavLink}
              to="/"
              color="secondary"
              startIcon={<WorkOutlineIcon />}
              sx={{ alignSelf: "stretch", borderRadius: 0 }}
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
                  sx={{ borderRadius: 8 }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        color={location.pathname === item.to ? "primary" : "text.secondary"}
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
