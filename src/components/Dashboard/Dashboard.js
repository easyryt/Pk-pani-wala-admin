import React, { useState } from "react";
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, Button, Grid, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar"; // Ensure Sidebar component exists
import { Outlet, useNavigate } from "react-router-dom"; // This renders nested routes
import Cookies from "js-cookie";
import Widget1 from "./Widgets/Widget1";
import LineChartWidget from "./Widgets/LineChartWidget";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    // Remove token and redirect to login page
    localStorage.removeItem("token");
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={logout} sx={{ marginLeft: "auto" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: 10,
        }}
      >
        {/* Render dynamic content based on routing */}
        <Outlet /> {/* This renders CreateProduct when navigated */}

        {/* Dashboard Widgets */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Widget1 />
          </Grid>
          {/* Add other widgets if needed */}
        </Grid>

        {/* Chart */}
        <Divider sx={{ marginY: 3 }} />
        <Box sx={{ width: "100%", paddingTop: 4 }}>
          <LineChartWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
