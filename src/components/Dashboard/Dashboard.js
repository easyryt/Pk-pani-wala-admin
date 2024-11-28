import React, { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, Grid, AppBar, IconButton, Button, Drawer, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Widget1 from './Widgets/Widget1';
import Widget2 from './Widgets/Widget2';
import Widget3 from './Widgets/Widget3';
import Cookies from 'js-cookie';

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout =()=>{
    Cookies.remove('token');
      window.location.href="/login"
   }
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      window.location.href="/login"
    }
  }, [ ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Sidebar />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
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
    </Box>
  );
};

export default Dashboard;
