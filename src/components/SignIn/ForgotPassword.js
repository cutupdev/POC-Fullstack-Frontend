import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isEmail } from '../../validation';

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

function ForgotPassword({ open, handleClose }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');

    let isValid = true;

    if (!email.value || !isEmail(email.value)) {
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
      style={{background: '#FBFCFE !important'}}
      className='auth-box'
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
      }}
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
            FormHelperTextProps={{ style: { fontFamily: 'roboto', fontSize: 16 } }}
          />
        </ThemeProvider>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }} className='auth-box'>
        <Button onClick={handleClose} className='roboto-font reset-btn'>Cancel</Button>
        <Button 
          variant="contained" 
          type="submit"
          onClick={validateInputs}
          className='roboto-font reset-btn'
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
