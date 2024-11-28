import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  AppBar,
  Grid,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Sidebar from "./Sidebar"; // Sidebar component
import { Outlet, useNavigate } from "react-router-dom"; // Outlet renders child routes like CreateProduct
import Cookies from "js-cookie";

// Add your logo image here
import logo from "../Images/logo512.png"; // Adjust the path

const drawerWidth = 260;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #1A237E, #2196F3)',  // Professional blue gradient
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', // Subtle shadow for depth
          transition: "background 0.3s ease-in-out",
        }}
      >
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
          {/* Logo in the header */}
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "40px",
              marginRight: "10px",
              borderRadius: "8px",
            }}
          />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: "#0D47A1",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0B3C85",
              },
              transition: "background-color 0.3s ease",
              padding: "8px 16px",
            }}
          >
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
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "linear-gradient(to bottom, #2A5298, #1E3C72)",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(8px)", // Adds blur effect to sidebar
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "linear-gradient(to bottom, #2A5298, #1E3C72)",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(8px)", // Adds blur effect to sidebar
            },
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
          marginTop: "0px", // Adjusts for AppBar height
          background: "linear-gradient(to bottom, #F0F4F8, #E0E7FF)",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
