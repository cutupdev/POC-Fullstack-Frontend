import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isEmail } from '../../validation';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const theme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 0 1px black',
          borderRadius: '0px !important',
          backgroundColor: '#f3f3f3', // background color of the input
          '&:hover:before': {
            borderBottomColor: 'black', // on hover
          },
          '&.Mui-focused': {
            borderRadius: '0px !important',
            borderColor: 'blue', // focus color for entire border
            boxShadow: '0 0 0 2px blue', // simulating border with box-shadow
            '&:before': {
              borderBottomColor: 'blue', // make the bottom border also blue
            }
          },
          '&.Mui-error': {
            boxShadow: '0 0 0 2px red', // Red outline simulating border for error
            borderRadius: '0px !important',
          },
          '&:before': {
            borderBottom: '1px solid white', // Default underline color
            left: 0,
            bottom: 0,
            right: 0,
            content: '""',
            position: 'absolute',
          },
          '&.Mui-error:before': {
            borderBottom: '2px solid transparent', // Hide default underline when there's an error
          }
        }
      }
    }
  }
});

function ForgotPassword({ open, handleClose, setSnackState }) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [disableBtn, setDisavleBtn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
    setEmail('');
    setDisavleBtn(false);
  }, [])

  const onEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e) => {

    e.preventDefault();
    if (validInputs()) {
      setDisavleBtn(true);
      const user = {
        email: email,
      };

      api.post('users/forgotPassword', user)
        .then(res => {
          if (res.data.success) {
            setSnackState({
              snackOpen: true,
              vertical: 'top',
              horizontal: 'center',
              message: "You will receive an email to reset your password, if your email is a valid account in our system. If you don't see an email in your inbox, please check your spam folder as well"
            });
          } else {
            setSnackState({
              snackOpen: true,
              vertical: 'top',
              horizontal: 'center',
              message: "Incorrect Email. Try again with correct Credential"
            });
          }
        })
        .catch(err => {
          setSnackState({
            snackOpen: true,
            vertical: 'top',
            horizontal: 'center',
            message: "Incorrect Email. Try again with correct Credential"
          });
          console.log(err);
        })

      setTimeout(() => {
        handleClose();
        setDisavleBtn(false);
      }, 3000)
    }
  }

  const validInputs = () => {

    let isValid = true;

    if (!email || !isEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  };


  return (
    <Dialog
      open={open}
      style={{ background: '#FBFCFE !important' }}
      className='auth-box'
      onClose={handleClose}
    // PaperProps={{
    //   component: 'form',
    //   onSubmit: (event) => {
    //     event.preventDefault();
    //     setTimeout(() => {
    //       handleClose();
    //     }, 10000)
    //   },
    // }}
    >
      <DialogTitle
        className='roboto-font auth-box'
        variant="h4"
        component="h1"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Reset password
      </DialogTitle>
      <DialogContent
        className='auth-box'
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText
          className='roboto-font small-font-size'
        >
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <ThemeProvider theme={theme}>
          <TextField
            error={emailError}
            onChange={onEmail}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            label="Email"
            variant="filled"
            autoComplete="email"
            // autoFocus
            required
            fullWidth
            color={emailError ? 'error' : 'primary'}
            // sx={{ ariaLabel: 'email' }}
            className='signin-box'
            inputProps={{
              style: {
                fontSize: 24,
                borderRadius: 0,
                fontFamily: 'roboto',
                backgroundColor: '#fff',
                height: '32px'
              }
            }} // font size of input text
            InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto' } }} // font size of input label
            FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16, color: '#ff0000 !important' } }}
          />
        </ThemeProvider>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }} className='auth-box'>
        <Button onClick={handleClose} className='roboto-font reset-btn'>Cancel</Button>
        {
          disableBtn ?
        <Button
          disabled
          variant="contained"
          onClick={onSubmit}
          className='roboto-font reset-btn'
        >
          Continue
        </Button>
        :
<Button
          variant="contained"
          onClick={onSubmit}
          className='roboto-font reset-btn'
        >
          Continue
        </Button>
        }
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
