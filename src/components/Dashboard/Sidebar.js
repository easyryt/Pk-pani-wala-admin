import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Create Product",
      icon: <CreateIcon />,
      path: "/dashboard/create-product",
    },
    {
      text: "All Products",
      icon: <BorderAllIcon />,
      path: "/dashboard/all-product",
    },
    {
      text: "Floor wise charges",
      icon: <AttachMoneyIcon />,
      path: "/dashboard/floor-wise-charges",
    },
    {
      text: "List Of Floor charges",
      icon: <FormatListNumberedIcon />,
      path: "/dashboard/charges-list",
    },
    {
      text: "Delivery Charge",
      icon: <DeliveryDiningIcon />,
      path: "/dashboard/delivery-Charge",
    },
    {
      text: "All Delivery Charge",
      icon: <DeliveryDiningIcon />,
      path: "/dashboard/all-delivery-Charges",
    },
    {
      text: "Consumers",
      icon: <GroupIcon />,
      path: "/dashboard/consumers",
    },
    {
      text: "Order History",
      icon: <LocalShippingSharpIcon />,
      path: "/dashboard/order-history",
    },
    {
      text: "Banner Create",
      icon: <ViewCarouselOutlinedIcon />,
      path: "/dashboard/banner-create",
    },
    {
      text: "All Banner",
      icon: <ViewCarouselOutlinedIcon />,
      path: "/dashboard/banner-list",
    },
  ];

  // Inline styles for sidebar
  const sidebarStyles = {
    width: "260px",
    height: "100vh",
    background: "linear-gradient(135deg, #1A237E, #2196F3)", // Professional blue gradient
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    overflowY: "auto", // Enables vertical scroll only when needed
    overflowX: "hidden", // Hides horizontal scrollbar
    scrollBehavior: "smooth", // Smooth scroll behavior
    msOverflowStyle: "none", // Disables scrollbars for IE
  };

  // Styles for List
  const listStyles = {
    width: "100%",
    padding: 0,
    marginTop: "0px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  // Styles for each menu item
  const menuItemStyles = {
    padding: "12px 20px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    cursor: "pointer",
  };

  // Hover styles
  const menuItemHoverStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle hover effect
    transform: "translateX(5px)", // Slide effect
  };

  // Active styles
  const menuItemSelectedStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Active background color
    color: "#ffffff", // Text color for active item
  };

  const menuItemTextStyles = {
    color: "#ffffff", // Default white text color
    fontWeight: "600", // Bold text for emphasis
    fontSize: "16px",
  };

  const menuItemIconStyles = {
    color: "#ffffff", // Default icon color
    fontSize: "20px",
    transition: "color 0.2s ease", // Smooth color transition on hover
  };

  const menuItemSelectedIconStyles = {
    color: "#FFEB3B", // Golden color for selected icon
  };

  return (
    <Box sx={sidebarStyles}>
      <Toolbar />
      <Divider sx={{ backgroundColor: "#B0BEC5", margin: "10px 0" }} />
      <List sx={listStyles}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              ...menuItemStyles,
              ...(location.pathname === item.path
                ? menuItemSelectedStyles
                : {}),
              "&:hover": menuItemHoverStyles, // Apply hover styles dynamically
            }}
          >
            <ListItemIcon
              sx={{
                ...menuItemIconStyles,
                ...(location.pathname === item.path
                  ? menuItemSelectedIconStyles
                  : {}),
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={menuItemTextStyles} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

// Custom scrollbar styles
const customScrollbarStyles = `
  /* Custom scrollbar for Chrome, Safari and Edge */
  ::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
    height: 0px; /* Hides horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3); /* Light gray thumb */
    border-radius: 10px; /* Rounded corners for the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5); /* Darker thumb on hover */
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1); /* Track color */
    border-radius: 10px;
  }

  /* Custom scrollbar for Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.1); /* Thumb and track color */
`;

const globalStyles = document.createElement("style");
globalStyles.innerHTML = customScrollbarStyles;
document.head.appendChild(globalStyles);
