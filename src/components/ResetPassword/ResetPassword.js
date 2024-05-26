import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Card as MuiCard } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { hasUpperCase, hasLowerCase, hasNumeric, hasSpecialCharacter } from '../../validation';
import getSignUpTheme from './getSignUpTheme';
import { SitemarkIcon } from './CustomIcons';
import Snackbar from '@mui/joy/Snackbar';
import axios from 'axios';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(4),
  width: '100%',
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px'
      : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    width: '600px',
  },
}));

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  padingBottom: theme.spacing(12),
  backgroundImage:
    theme.palette.mode === 'light'
      ? 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
      : 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    paddingBottom: 0,
    height: '100dvh',
  },
}));

export default function SignUp() {
  // const [mode, setMode] = React.useState('light');
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  // const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme('light'));
  const [newPassword, setNewPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState('Password must be longer than 12 characters. Also it must include one numeric, one special character, one upper case, one lower case at least.');
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(true);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [newVisible, setNewVisible] = React.useState(false);
  const [newType, setNewType] = React.useState('password');
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [confirmType, setConfirmType] = React.useState('password');
  const navigate = useNavigate();
  const location = useLocation();
  const [ submitBtn, setSubmitBtn ] = React.useState(false);
  const [snackState, setSnackState] = React.useState({
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
    message: ""
  });
  const { vertical, horizontal, snackOpen, message } = snackState;

  React.useEffect(() => {
    setNewPassword("");
    setConfirmPassword("");
    setNewPasswordError(false);
    setNewPasswordErrorMessage("");
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMessage('Password must be longer than 12 characters. Also it must include one numeric, one special character, one upper case, one lower case at least.');
  }, [])

  React.useEffect(() => {
    setEmail(location.pathname.split('/reset-password/')[0].split('/')[1]);
    setToken(location.pathname.split('/reset-password/')[1]);
  }, [navigate, location])

  const onNewPass = (e) => {
    setNewPassword(e.target.value);
  }

  const onConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  }

  const validateInputs = () => {

    let isValid = true;

    if (!newPassword || newPassword.length < 12 || !hasUpperCase(newPassword) || !hasLowerCase(newPassword) || !hasNumeric(newPassword) || !hasSpecialCharacter(newPassword)) {
      setNewPasswordError(true);
      if (!newPassword || newPassword.length < 12) {
        setNewPasswordErrorMessage('Password must be at least 12 characters long.');
      } else if (!hasUpperCase(newPassword)) {
        setNewPasswordErrorMessage('Password must include one uppercase at least.');
      } else if (!hasLowerCase(newPassword)) {
        setNewPasswordErrorMessage('Password must include one lowercase at least.');
      } else if (!hasNumeric(newPassword)) {
        setNewPasswordErrorMessage('Password must include one numeric at least.');
      } else if (!hasSpecialCharacter(newPassword)) {
        setNewPasswordErrorMessage('Password must include one special character at least.');
      } else {
        setNewPasswordErrorMessage('Password format is not correct. Try again.');
      }
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage('');
    }

    if (!confirmPassword || confirmPassword.length < 12 || !hasUpperCase(confirmPassword) || !hasLowerCase(confirmPassword) || !hasNumeric(confirmPassword) || !hasSpecialCharacter(confirmPassword)) {
      setConfirmPasswordError(true);
      if (!confirmPassword || confirmPassword.length < 12) {
        setConfirmPasswordErrorMessage('Password must be at least 12 characters long.');
      } else if (!hasUpperCase(confirmPassword)) {
        setConfirmPasswordErrorMessage('Password must include one uppercase at least.');
      } else if (!hasLowerCase(confirmPassword)) {
        setConfirmPasswordErrorMessage('Password must include one lowercase at least.');
      } else if (!hasNumeric(confirmPassword)) {
        setConfirmPasswordErrorMessage('Password must include one numeric at least.');
      } else if (!hasSpecialCharacter(confirmPassword)) {
        setConfirmPasswordErrorMessage('Password must include one special character at least.');
      } else {
        setConfirmPasswordErrorMessage('Password format is not correct. Try again.');
      }
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('Enough Possible');
    }

    if (newPassword === confirmPassword) {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    } else {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Password does not match!');
      isValid = false;
    }

    return isValid;
  };

  const handleNewVisibility = () => {
    if (newType === 'password') {
      setNewVisible(true);
      setNewType('text')
    } else {
      setNewVisible(false)
      setNewType('password')
    }
  }

  const handleConfirmVisibility = () => {
    if (confirmType === 'password') {
      setConfirmVisible(true);
      setConfirmType('text')
    } else {
      setConfirmVisible(false)
      setConfirmType('password')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitBtn(true);
    if(validateInputs()) {
      const data = {
        email: email,
        token: token,
        password: confirmPassword
      };
      axios.post('https://4a29-45-8-22-59.ngrok-free.app/api/users/resetPassword', data)
        .then(res => {
          if (res.data.success) {
            setSnackState({
              snackOpen: true,
              vertical: 'top',
              horizontal: 'center',
              message: "Your password is reset. You can sign-in now"
            });
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            setSnackState({
              snackOpen: true,
              vertical: 'top',
              horizontal: 'center',
              message: "Your password couldn't reset! Try again now."
            });
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch(err => {
          setSnackState({
            snackOpen: true,
            vertical: 'top',
            horizontal: 'center',
            message: "Your password couldn't reset! Try again now."
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
    } else {

    }
    
  };

  return (
    <div>
      <ThemeProvider theme={SignUpTheme}>
        <CssBaseline />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Stack
            justifyContent="center"
            sx={{ height: { xs: '100%', sm: '100dvh' }, p: 2 }}
          >
            <Card>
              <SitemarkIcon />
              <Typography
                component="h1"
                className='roboto-font'
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Reset Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <ThemeProvider theme={theme}>
                    <TextField
                      label="New Password"
                      variant="filled"
                      value={newPassword}
                      // color='primary'
                      onChange={onNewPass}
                      className='signin-box'
                      inputProps={{
                        style: {
                          fontSize: 24,
                          borderRadius: 0,
                          fontFamily: 'roboto',
                          backgroundColor: '#fff',
                          height: '32px',
                        }
                      }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto' } }} // font size of input label
                      FormHelperTextProps={{ style: { fontFamily: 'roboto', fontSize: 16 } }}
                      required
                      fullWidth
                      name="new-password"
                      type={newType}
                      id="new-password"
                      autoComplete="new-password"
                      error={newPasswordError}
                      helperText={newPasswordErrorMessage}
                      color={newPasswordError ? 'error' : 'primary'}
                    />
                  </ThemeProvider>
                  <span className='visibility-box'>
                    {newVisible ? <VisibilityIcon className='visibility1' onClick={handleNewVisibility} /> : <VisibilityOffIcon className='visibility2' onClick={handleNewVisibility} />}
                  </span>
                </FormControl>
                <FormControl>
                  <ThemeProvider theme={theme}>
                    <TextField
                      name="confirm-password"
                      type={confirmType}
                      id="confirm-password"
                      autoComplete="confirm-password"
                      error={confirmPasswordError}
                      helperText={confirmPasswordErrorMessage}
                      color={confirmPasswordError ? 'error' : 'primary'}
                      label="Confirm Password"
                      variant="filled"
                      value={confirmPassword}
                      // color='primary'
                      onChange={onConfirmPass}
                      className='signin-box'
                      inputProps={{
                        style: {
                          fontSize: 24,
                          borderRadius: 0,
                          fontFamily: 'roboto',
                          backgroundColor: '#fff',
                          height: '32px',
                        }
                      }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto' } }} // font size of input label
                      FormHelperTextProps={{ style: { fontFamily: 'roboto', fontSize: 16 } }}
                      required
                      fullWidth
                    />
                  </ThemeProvider>
                  <span className='visibility-box'>
                    {confirmVisible ? <VisibilityIcon className='visibility1' onClick={handleConfirmVisibility} /> : <VisibilityOffIcon className='visibility2' onClick={handleConfirmVisibility} />}
                  </span>
                </FormControl>
                <div className='flex-end'>
                  {submitBtn ?
                  <Button
                    disabled
                    type="submit"
                    // {snackOpen? disabled: ""}
                    className='submit-btn roboto-font'
                    // fullWidth
                    variant="contained"
                    // onClick={validateInputs}
                  >
                    Reset
                  </Button>
                  :
                  <Button
                    type="submit"
                    // {snackOpen? disabled: ""}
                    className='submit-btn roboto-font'
                    // fullWidth
                    variant="contained"
                    // onClick={validateInputs}
                  >
                    Reset
                  </Button>
                  }
                </div>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={4000}
        open={snackOpen && (!(newPasswordError || confirmPasswordError))}
        variant='outlined'
        color='primary'
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setSnackState({
            snackOpen: false,
            vertical: 'top',
            horizontal: 'center',
            message: ""
          });
          setSubmitBtn(false);
        }}
      >
        {message}
      </Snackbar>
    </div>
  );
}
