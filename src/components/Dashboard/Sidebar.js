import React from 'react';
import { List, ListItem, ListItemText, Toolbar, Divider, ListItemIcon } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';
import BoltIcon from '@mui/icons-material/Bolt';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Category', icon: <CreateIcon />, path: '/category' },
    { text: 'Page List', icon: <ViewListIcon />, path: '/page-list' },
    { text: 'Instant Indexing', icon: <BoltIcon />, path: '/instant-indexing' },
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              '&.Mui-selected': { backgroundColor: 'rgba(0, 120, 255, 0.2)' },
              '&:hover': { backgroundColor: 'rgba(0, 120, 255, 0.1)' },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
