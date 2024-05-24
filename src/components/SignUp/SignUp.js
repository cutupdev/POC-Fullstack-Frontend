import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card as MuiCard } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ReCAPTCHA from 'react-google-recaptcha'
import { hasUpperCase, hasLowerCase, hasNumeric, hasSpecialCharacter, isEmail } from '../../validation';
import getSignUpTheme from './getSignUpTheme';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { SitemarkIcon } from './CustomIcons';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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
  const navigate = useNavigate();
  const SignUpTheme = createTheme(getSignUpTheme('light'));
  const [message, setMessage] = React.useState("");
  const [registerState, setRegisterState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [captchaError, setCaptchaError] = React.useState(false);
  const [captchaErrorMessage, setCaptchaErrorMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('Password must be longer than 12 characters. Also it must include one numeric, one special character, one upper case, one lower case at least.');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState('password');
  const recaptcha = React.useRef();

  React.useEffect(() => {
    if(localStorage.getItem('user')) {
      navigate('/dashboard');
      // const user = JSON.parse(localStorage.getItem('user'));
      // if(user.remember) {
      // }
    } 
    setEmail("");
    setPassword("");
    setName("");
    setMessage("");
    setRegisterState(false);
  }, [])

  React.useEffect(() => {

  }, [message])

  const pwdChange = (event) => {
    setPassword(event.target.value);
  }

  const nameChange = (event) => {
    setName(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleVerify = () => {
    setOpen(false);
    if(registerState) {
      navigate("/");
    } 
    setRegisterState(false);    
  }

  const validateInputs = () => {

    let isValid = true;

    if (!name) {
      setNameError(true);
      setNameErrorMessage('Please fill out the name.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!email || !isEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 12 || !hasUpperCase(password) || !hasLowerCase(password) || !hasNumeric(password) || !hasSpecialCharacter(password)) {
      setPasswordError(true);
      if (!password || password.length < 12) {
        setPasswordErrorMessage('Password must be at least 12 characters long.');
      } else if (!hasUpperCase(password)) {
        setPasswordErrorMessage('Password must include one uppercase at least.');
      } else if (!hasLowerCase(password)) {
        setPasswordErrorMessage('Password must include one lowercase at least.');
      } else if (!hasNumeric(password)) {
        setPasswordErrorMessage('Password must include one numeric at least.');
      } else if (!hasSpecialCharacter(password)) {
        setPasswordErrorMessage('Password must include one special character at least.');
      } else {
        setPasswordErrorMessage('Password format is not correct. Try again.');
      }

      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
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

    const captchaValue = recaptcha.current.getValue()

    if (!captchaValue) {
      setCaptchaError(true);
      setCaptchaErrorMessage("Please verify the reCAPTCHA!");
    } else {

      setCaptchaError(false);
      setCaptchaErrorMessage("");

      const newUser = {
        username: name,
        email: email,
        password: password,
        captcha: captchaValue
      };
      
      axios.post('https://4a29-45-8-22-59.ngrok-free.app/api/users/signup',  newUser)
        .then(res => {
          if (res.data.success) {
            setRegisterState(true);
            setMessage("Thank you for the Registration. To use your account, you need to verify the account using the link sent to your email. If you don't see an email in your inbox, please check your spam folder as well");
            setOpen(true);
          } else {
            setRegisterState(false);
            setMessage("Email address already exists. Please click here to Sign In. If you don't remember your password, you can reset it on the Sign In page.");
            setOpen(true);
          }
        })
        .catch(err => {
          setRegisterState(false);
          setMessage("Email address already exists. Please click here to Sign In. If you don't remember your password, you can reset it on the Sign In page");
          setOpen(true);
          console.log(err.response.data);
        })
    }
  };

  return (
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
                  onChange={nameChange}
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
                  FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16 } }}
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
                  onChange={emailChange}
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
                  FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16 } }}
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
                    FormHelperTextProps={{ style: { fontFamily: 'roboto !important', fontSize: 16 } }}
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
                <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />
              </div>
              {captchaError ? <p className='dis-center color-red'>{captchaErrorMessage}</p> : <p></p>}
            </Box>
          </Card>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            {/* <DialogTitle className='dis-center' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <p className='font-size-28 roboto-font'>{registerState ? "Verify Your Account" : "Retry Your Registration"}</p>
            </DialogTitle> */}
            <DialogContent dividers>
              <Typography className='font-size-16 roboto-font' gutterBottom>
                {message}
              </Typography>
            </DialogContent>
            <DialogActions className='dis-center'>
              <Button className='font-size-20 roboto-font' autoFocus onClick={handleVerify}>
                {registerState ? "Sign In" : "Sign In"}
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
