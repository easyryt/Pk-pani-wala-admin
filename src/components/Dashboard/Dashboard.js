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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
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
          background: "linear-gradient(135deg, #004D7F, #00A9E0)",  // Modern gradient
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Clean shadow for depth
          backdropFilter: "blur(12px)", // Blur effect for a modern feel
          transition: "background 0.3s ease-in-out",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 30px",  // Add more padding for spacing
          }}
        >
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "50px",
                marginRight: "15px",
                borderRadius: "10px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Soft shadow for logo
              }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "1.25rem",
                letterSpacing: "0.5px",
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: "#ff5f57", // Soft red for logout
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#e04e4b",
              },
              padding: "10px 18px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow on hover
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
              background: "linear-gradient(to bottom, #2A5298, #1E3C72)",  // Sidebar gradient
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(10px)", // Apply blur effect to sidebar
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
              background: "linear-gradient(to bottom, #2A5298, #1E3C72)",  // Sidebar gradient
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(10px)", // Apply blur effect to sidebar
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
          marginTop: "0px",  // Adjusts for AppBar height
          background: "#f4f5f7",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for main content
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
