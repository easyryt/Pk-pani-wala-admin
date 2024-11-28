import React, { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, AppBar, IconButton, Button, Drawer, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/Dashboard/Sidebar';

import CustomPageForm from './CustomPageForm';
import Cookies from 'js-cookie';
const drawerWidth = 240;

const CreateCustomPage = () => {  const logout =()=>{
    Cookies.remove('token');
      window.location.href="/login"
   }
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      window.location.href="/login"
    }
  }, [ ]);
  
  const [mobileOpen, setMobileOpen] = useState(false);

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
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar /> {/* Ensure that the content below the AppBar is properly padded */}
        <CustomPageForm />
      </Box>
    </Box>
  );
};

export default CreateCustomPage;
