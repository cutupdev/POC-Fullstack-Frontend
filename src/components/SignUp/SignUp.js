import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card as MuiCard } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ReCAPTCHA from 'react-google-recaptcha'
// import 'dotenv';
// require('dotenv').config()

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { hasUpperCase, hasLowerCase, hasNumeric, hasSpecialCharacter, isEmail } from '../../validation';

import getSignUpTheme from './getSignUpTheme';
import ToggleColorMode from './ToggleColorMode';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Toggle design language"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

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
          '&:before': { // underline pseudo-element
            borderBottomColor: 'grey',
          },
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
            borderBottom: '1px solid grey', // Default underline color
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
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('Password must be longer than 12 characters. Also it must include one numeric, one special character, one upper case, one lower case at least.');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState('password');

  const pwdChange = (event) => {
    let pwd = document.getElementById('password');
    if (pwd.value != password || pwd.value != "") {
      setPassword(event.target.value);
    }
    setPassword(event.target.value);
    console.log(password)
  }

  const validateInputs = () => {
    console.log("ddddddddddddddddd")
    console.log(process.env.REACT_APP_SITE_KEY)
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!name.value) {
      setNameError(true);
      setNameErrorMessage('Please fill out the name.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!email.value || !isEmail(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 12 || !hasUpperCase(password.value) || !hasLowerCase(password.value) || !hasNumeric(password.value) || !hasSpecialCharacter(password.value)) {
      setPasswordError(true);
      if (!password.value || password.value.length < 12) {
        setPasswordErrorMessage('Password must be at least 12 characters long.');
      } else if (!hasUpperCase(password.value)) {
        setPasswordErrorMessage('Password must include one uppercase at least.');
      } else if (!hasLowerCase(password.value)) {
        setPasswordErrorMessage('Password must include one lowercase at least.');
      } else if (!hasNumeric(password.value)) {
        setPasswordErrorMessage('Password must include one numeric at least.');
      } else if (!hasSpecialCharacter(password.value)) {
        setPasswordErrorMessage('Password must include one special character at least.');
      } else {
        setPasswordErrorMessage('Password format is not correct. Try again.');
      }

      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('Enough Possible');
    }

    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleVisibility = () => {
    if (type === 'password') {
      setVisible(true);
      setType('text')
    } else {
      setVisible(false)
      setType('password')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get('name'),
    //   lastName: data.get('lastName'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          justifyContent="center"
          sx={{ height: { xs: '100%', sm: '100dvh' }, p: 2 }}
        >
          <Card>
            <SitemarkIcon />
            <Typography
              className='roboto-font'
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign up
            </Typography>
            <div className='flex roboto-font'>
              <div className='roboto-font small-font-size'>If you already have an account, &nbsp;  </div>
              <Link
                href="/"
                variant="body2"
                className='roboto-font small-font-size'
                sx={{ alignSelf: 'center' }}
              >
                you can sign in here
              </Link>
              <div sx={{ alignSelf: 'center' }}>.</div>
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  // placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  type="text"
                  label="Full name"
                  variant="filled"
                  // autoFocus
                  color={nameError ? 'error' : 'primary'}
                  // sx={{ ariaLabel: 'email' }}
                  className='signin-box'
                  inputProps={{ 
                    style: { 
                      fontSize: 24, 
                      borderRadius: 0, 
                      fontFamily: 'roboto !important', 
                      backgroundColor: '#fff', 
                      height: '32px' 
                    } 
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto !important' } }} // font size of input label
                  FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16 }}}
                />
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <TextField
                  // placeholder="your@email.com"
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
                      fontFamily: 'roboto !important', 
                      backgroundColor: '#fff', 
                      height: '32px' 
                    } 
                  }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto !important' } }} // font size of input label
                  FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16 }}}
                />
              </ThemeProvider>

              <FormControl>
                {/* <div className='password-box'> */}
                  <ThemeProvider theme={theme}>
                    <TextField
                      error={passwordError}
                      helperText={passwordErrorMessage}
                      id="password"
                      type={type}
                      name="password"
                      label="Password"
                      variant="filled"
                      autoComplete="current-password"
                      required
                      fullWidth
                      value={password}
                      color={passwordError ? 'error' : 'primary'}
                      // color='primary'
                      onChange={pwdChange}
                      className='signin-box'
                      inputProps={{ 
                        style: { 
                          fontSize: 24, 
                          borderRadius: 0, 
                          fontFamily: 'roboto !important',
                          backgroundColor: '#fff', 
                          height: '32px',
                        } 
                      }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto !important' } }} // font size of input label
                      FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16 }}}
                    />
                  </ThemeProvider>
                  <span className='visibility-box'>
                    {visible ? <VisibilityIcon className='visibility1' onClick={handleVisibility} /> : <VisibilityOffIcon className='visibility2' onClick={handleVisibility} />}
                  </span>
                {/* </div> */}
              </FormControl>
              <div className='flex-end'>
                <Button
                  type="submit"
                  className='submit-btn roboto-font'
                  // fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  Sign up
                </Button>
              </div>
              <div className='dis-center'>
                <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY}/>
              </div>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
