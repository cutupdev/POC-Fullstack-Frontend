import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Content from './components/Content';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import AccountMenu from './components/AccountMenu'
import Sitemark from './components/SitemarkIcon';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useLocation } from 'react-router-dom';

// function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100dvw',
//         position: 'fixed',
//         bottom: 24,
//       }}
//     >
//       <ToggleButtonGroup
//         color="primary"
//         exclusive
//         value={showCustomTheme}
//         onChange={toggleCustomTheme}
//         aria-label="Toggle design language"
//         sx={{
//           backgroundColor: 'background.default',
//           '& .Mui-selected': {
//             pointerEvents: 'none',
//           },
//         }}
//       >
//         <ToggleButton value>
//           <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
//           Custom theme
//         </ToggleButton>
//         <ToggleButton value={false}>Material Design 2</ToggleButton>
//       </ToggleButtonGroup>
//     </Box>
//   );
// }

// ToggleCustomTheme.propTypes = {
//   showCustomTheme: PropTypes.shape({
//     valueOf: PropTypes.func.isRequired,
//   }).isRequired,
//   toggleCustomTheme: PropTypes.func.isRequired,
// };

export default function TemporaryDrawer() {
  const navigate = useNavigate();
  // const [mode, setMode] = React.useState('light');
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme('light'));
  // const defaultTheme = createTheme({ palette: { mode } });

  const location = useLocation().pathname;
  let path = ""
  if (location === '/admin/' || location === '/admin') {
    path = "Dashboard";
  } else {
    path = "Admin";
  }

  const sidebarClose = () => {
    setOpen(false);
    console.log("sidebar closed! ")
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
          <div className='leftbar-item-box mouse-pointer' onClick={() => navigate("/admin")}>
            <AdminPanelSettingsIcon className='mouse-pointer ml-10' />
            <p className='font-size-16 roboto-font leftbar-item-btn mouse-pointer leftbar-btn-background'>{path}</p>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <ThemeProvider theme={ LPtheme }>
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
          })
        }
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
            margin: '0px !important',
            gap: 0.5,
            alignItems: 'center',
          }}
        >
          <AccountMenu />
        </Box>
      </Toolbar>

      <Content />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}