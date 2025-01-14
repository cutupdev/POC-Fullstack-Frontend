import * as React from 'react';
import { login } from '../../hook/useAuth';
import { getData, getCategory } from '../../hook/useApp';
import AuthContext from '../../context/authContext';
import AppContext from '../../context/appContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Card as MuiCard } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { hasUpperCase, hasLowerCase, hasNumeric, hasSpecialCharacter, isEmail } from '../../validation';
import passValid from '../../utils/passwordValid';
import ForgotPassword from './ForgotPassword';
import getSignInTheme from './getSignInTheme';
import { SitemarkIcon } from './CustomIcons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


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

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn() {
  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const { fileList, setFileList, categoryList, setCategoryList } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = React.useState(false);
  const SignInTheme = createTheme(getSignInTheme('light'));
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState('password');
  const checkboxRef = React.useRef(null);
  const [snackState, setSnackState] = React.useState({
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
    message: ""
  });
  const { vertical, horizontal, snackOpen, message } = snackState;

  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
    setPassword("");
  }, [])

  const onEmail = (e) => {
    setEmail(e.target.value);
  }

  const pwdChange = (event) => {
    setPassword(event.target.value);
  }

  const handleClickOpen = () => {
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setEmailErrorMessage('');
    setEmail('');
    setPassword('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const loginUser = {
        email: email,
        password: password,
        checked: checkboxRef.current.checked
      }
      try {
        const userData = await login(loginUser);
        setCurrentUser(jwtDecode(userData.authToken).user);

        const files = await getData();
        if (files && files.length) {
          const tempFiles = [...files];
          console.log(tempFiles)
          setFileList(tempFiles);
        }

        const categories = await getCategory();
        if (categories && categories.length) {
          const tempCategories = [...categories];
          console.log(tempCategories)
          setCategoryList(tempCategories);
        }

        navigate('/dashboard');
      } catch (error) {
        setLoginError(true);
        console.log('error ===> ', error);
      }
    }
  };

  const validateInputs = () => {
    console.log('clieck valid')
    let isValid = true;
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage("");

    if (!email || !isEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    const passReturn = passValid(password);
    if (passReturn) {
      setPasswordError(true);
      setPasswordErrorMessage(passReturn);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <div>
      <ThemeProvider theme={SignInTheme}>
        <CssBaseline />
        <SignInContainer direction="column" justifyContent="space-between" className='roboto-font'>
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
                Sign in
              </Typography>
              <div className='flex roboto-font'>
                <div className='roboto-font small-font-size'>If you don't have an account, &nbsp;  </div>
                <Link
                  href="/sign-up/"
                  variant="body2"
                  className='roboto-font small-font-size'
                  sx={{ alignSelf: 'center' }}
                >
                  you can sign up here
                </Link>
                <div sx={{ alignSelf: 'center' }}>.</div>
              </div>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2,
                }}
              >
                <FormControl className='signin-box'>
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
                      onChange={onEmail}
                      required
                      fullWidth
                      color={emailError ? 'error' : 'primary'}
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
                </FormControl>
                <FormControl>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <p
                      component="button"
                      className='roboto-font small-font-size forgot-password'
                      onClick={handleClickOpen}
                      variant="body2"
                      sx={{ alignSelf: 'baseline' }}
                    >
                      Forgot Password
                    </p>
                  </Box>

                  <div className='password-box'>
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
                      {visible ? <VisibilityIcon className='visibility' onClick={handleVisibility} /> : <VisibilityOffIcon className='visibility' onClick={handleVisibility} />}
                    </span>
                  </div>
                </FormControl>
                <div className='remember-box'>
                  <input
                    className='roboto-font small-font-size remember-checkbox'
                    type="checkbox"
                    id="checkbox"
                    defaultChecked={true}
                    ref={checkboxRef}
                  />
                  <p className='roboto-font small-font-size'>Remember me</p>
                </div>
                <ForgotPassword open={open} handleClose={handleClose} setSnackState={setSnackState} />
                <div className='flex-end'>
                  <Button
                    type="submit"
                    className='submit-btn roboto-font'
                    variant="contained"
                  // onClick={validateInputs}
                  >
                    Sign in
                  </Button>
                </div>
              </Box>

            </Card>
          </Stack>
        </SignInContainer>
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={4000}
        open={snackOpen}
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
        }}
      >
        {message}
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={4000}
        open={loginError && (!(emailError || passwordError))}
        variant='outlined'
        color='primary'
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setLoginError(false);
        }}
      >
        Incorrect Email or Password. Try again with correct Credential
      </Snackbar>
    </div>
  );
}
