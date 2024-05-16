import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileModal, setProfileModal] = React.useState(false);
  const [fullname, setFullname] = React.useState("Microgift");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setFullname('Microgift');
    setAnchorEl(null);
  };
  const modalOpen = () => {
    setProfileModal(true);
  }
  const modalClose = () => {
    setProfileModal(false);
  }
  const profileSubmit = () => {
    console.log("submit")
    setProfileModal(false);
  }
  const handleChange = (event) => {
    setFullname(event.target.value);
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={modalOpen} className='menu-item global-font'>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose} className='menu-item global-font'>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Dialog
        open={profileModal}
        onClose={modalClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <DialogTitle className='modal-title'>Modify Profile</DialogTitle>
        <DialogContent>
          <DialogContentText className='modal-text'>
            To edit your full name, just modify your full name here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            className='roboto-font'
            value={fullname}
            onChange={handleChange}
            margin="dense"
            id="name"
            name="fullname"
            label="Full name"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ 
              style: { 
                fontSize: 20, 
                borderRadius: 0, 
                fontFamily: 'roboto !important',
                height: '32px' 
              } 
            }} // font size of input text
            InputLabelProps={{ style: { fontSize: 18, fontFamily: 'roboto !important' } }} // font size of input label
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={modalClose} className='modal-btn'>Cancel</Button>
          <Button onClick={profileSubmit} className='modal-btn'>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}