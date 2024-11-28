import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import Widget1 from './Widgets/Widget1';
import Widget2 from './Widgets/Widget2';
import Widget3 from './Widgets/Widget3';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const BackgroundBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundImage: 'url(https://source.unsplash.com/random/?ice,blue)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
}));

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  backdropFilter: 'blur(8px)',
  boxShadow: 'none',
}));

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    Cookies.remove('token');
    window.location.href = '/login';
  };

  return (
    <BackgroundBox>
      <CssBaseline />
      <CustomAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={logout} sx={{ marginLeft: 'auto' }}>
            Logout
          </Button>
        </Toolbar>
      </CustomAppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Widget1 />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Widget2 />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Widget3 />
          </Grid>
        </Grid>
      </Box>
    </BackgroundBox>
  );
};

export default Dashboard;
