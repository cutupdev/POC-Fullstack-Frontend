import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { profile } from '../../../hook/useAuth';
import { jwtDecode } from "jwt-decode";
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { logout } from '../../../hook/useAuth';
import Button from '@mui/material/Button';
import AuthContext from '../../../context/authContext';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

export default function AccountMenu() {
  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const [profileName, setProfileName] = React.useState('');
  const [currentEmail, setCurrentEmail] = React.useState('');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileModal, setProfileModal] = React.useState(false);
  const [fullname, setFullname] = React.useState('');
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.username.charAt(0).toUpperCase());
      setCurrentEmail(currentUser.email);
    }
  }, [currentUser])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const modalOpen = () => {
    setFullname(currentUser.username);
    setProfileModal(true);
  }
  const modalClose = () => {
    setProfileModal(false);
  }
  const profileSubmit = async (e) => {
    e.preventDefault();

    if (fullname) {
      const loginUser = {
        name: fullname,
        email: currentUser.email,
        checked: currentUser.remember
      }
      try {
        const userData = await profile(loginUser);
        setCurrentUser(jwtDecode(userData.authToken).user);
      } catch (error) {
        console.log('error ===> ', error);
      }
    }

    setProfileModal(false);

    setFullname('');
  }
  const handleChange = (event) => {
    setFullname(event.target.value);
  }
  const logOut = (e) => {
    setAnchorEl(null);
    logout();
    setCurrentUser(undefined);
    navigate('/');
  }
  return (
    <React.Fragment>
      <div className='profile-box'>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar className='font-size-16 roboto-font menu-avatar-48'>{profileName}</Avatar>
          </IconButton>
        </Tooltip>

      </div>
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
          <Avatar />
          <div className='font-size-16 roboto-font'>Profile</div>
        </MenuItem>
        <MenuItem className='menu-item global-font'>
          {currentEmail}
        </MenuItem>
        <MenuItem onClick={logOut} className='menu-item global-font'>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <div className='font-size-16 roboto-font'>Sign Out</div>
        </MenuItem>
      </Menu>
      <Dialog
        open={profileModal}
        onClose={modalClose}
      >
        <DialogTitle className='modal-title'>User Profile</DialogTitle>
        <DialogContent>
          <DialogContentText className='modal-text'>
            modify your full name here
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
          <div className='profile-email'>{currentEmail}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalClose} className='modal-btn'>Cancel</Button>
          <Button onClick={profileSubmit} className='modal-btn'>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}