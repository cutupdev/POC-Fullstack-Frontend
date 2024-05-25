import * as React from 'react';
// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdminContent from './components/AdminContent';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import { useLocation } from 'react-router-dom';
import Sitemark from './components/SitemarkIcon';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './components/AccountMenu';
import Drawer from '@mui/material/Drawer';


export default function Admin() {
  const navigate = useNavigate();
  const LPtheme = createTheme(getLPTheme('light'));

  React.useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/');
    } 
  }, [])

  const location = useLocation().pathname;
  let path = ""
  if (location === '/admin/' || location === '/admin') {
    path = "Dashboard";
  } else {
    path = "Admin";
  }

  const sidebarClose = () => {
    setOpen(false);
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, height: '100%', background: '#ffffff' }} role="presentation" onClick={toggleDrawer(false)}>
      <div className='leftbar-box'>
        <div className='leftbar-header'>
          <Sitemark />
          <div onClick={sidebarClose}>
            <CloseIcon className='mouse-pointer' />
          </div>
        </div>
        <div className='leftbar-content'>
          <div className='leftbar-item-box mouse-pointer' onClick={() => navigate("/dashboard")}>
            <DashboardIcon className='mouse-pointer ml-10' />
            <p className='font-size-16 roboto-font leftbar-item-btn mouse-pointer leftbar-btn-background'>{path}</p>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <ThemeProvider theme={LPtheme}>
      <Toolbar
        variant="regular"
        className='custom-navbar'
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          background: '#ffffff',
          justifyContent: 'space-between',
          flexShrink: 0,
          maxHeight: 40,
          })}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          className='menu-avatar-36'
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon className='menu-avatar-36' />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 0.5,
            alignItems: 'center',
          }}
        >
          <AccountMenu />
        </Box>
      </Toolbar>
      <AdminContent />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
