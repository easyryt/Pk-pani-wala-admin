// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, CssBaseline, Divider, ListItemIcon } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import CollectionsIcon from '@mui/icons-material/Collections';
import PagesIcon from '@mui/icons-material/Pages';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BoltIcon from '@mui/icons-material/Bolt';

const drawerWidth = 240;

// Styled components for improved UI
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Category', icon: <CreateIcon />, path: '/category' },
    { text: 'Page List', icon: <ViewListIcon />, path: '/page-list' },
    { text: 'Instant Indexing', icon: <BoltIcon />, path: '/instant-indexing' },
    // Add more navigation items as needed
  ];

  return (
    <StyledDrawer
      variant="permanent"
      sx={{ width: drawerWidth, flexShrink: 0 }}
    >
      <CssBaseline />
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: (theme) => theme.palette.action.selected,
              },
              '&:hover': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
