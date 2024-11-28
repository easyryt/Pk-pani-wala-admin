import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, Button, Grid, Divider, AppBar } from "@mui/material"; // Add AppBar here
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar"; // Sidebar component
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Outlet renders child routes like CreateProduct
import Cookies from "js-cookie";
import Widget1 from "./Widgets/Widget1";
import LineChartWidget from "./Widgets/LineChartWidget";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Redirect to login page if no token exists
    if (!Cookies.get("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    // Clear token and session data, navigate to login page
    Cookies.remove("token");
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  // Check if we are on the dashboard route or create-product route
  const isDashboardRoute = location.pathname === "/dashboard" || location.pathname === "/dashboard/create-product";

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
        {/* Render the dynamic content based on routing */}
        <Outlet /> {/* This will render CreateProduct when navigated to /dashboard/create-product */}
      </Box>
    </Box>
  );
};

export default Dashboard;
