import * as React from 'react';
import Box from '@mui/material/Box';
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
  const SignUpTheme = createTheme(getSignUpTheme(true));
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState('Password must be longer than 12 characters. Also it must include one numeric, one special character, one upper case, one lower case at least.');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [newVisible, setNewVisible] = React.useState(false);
  const [newType, setNewType] = React.useState('password');
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [confirmType, setConfirmType] = React.useState('password');

  const validateInputs = () => {
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');

    let isValid = true;

    if (!newPassword.value || newPassword.value.length < 12 || !hasUpperCase(newPassword.value) || !hasLowerCase(newPassword.value) || !hasNumeric(newPassword.value) || !hasSpecialCharacter(newPassword.value)) {
      setNewPasswordError(true);
      if (!newPassword.value || newPassword.value.length < 12) {
        setNewPasswordErrorMessage('Password must be at least 12 characters long.');
      } else if (!hasUpperCase(newPassword.value)) {
        setNewPasswordErrorMessage('Password must include one uppercase at least.');
      } else if (!hasLowerCase(newPassword.value)) {
        setNewPasswordErrorMessage('Password must include one lowercase at least.');
      } else if (!hasNumeric(newPassword.value)) {
        setNewPasswordErrorMessage('Password must include one numeric at least.');
      } else if (!hasSpecialCharacter(newPassword.value)) {
        setNewPasswordErrorMessage('Password must include one special character at least.');
      } else {
        setNewPasswordErrorMessage('Password format is not correct. Try again.');
      }
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage('Enough Possible');
    }

    if (!confirmPassword.value || confirmPassword.value.length < 12 || !hasUpperCase(confirmPassword.value) || !hasLowerCase(confirmPassword.value) || !hasNumeric(confirmPassword.value) || !hasSpecialCharacter(confirmPassword.value)) {
      setConfirmPasswordError(true);
      if (!confirmPassword.value || confirmPassword.value.length < 12) {
        setConfirmPasswordErrorMessage('Password must be at least 12 characters long.');
      } else if (!hasUpperCase(confirmPassword.value)) {
        setConfirmPasswordErrorMessage('Password must include one uppercase at least.');
      } else if (!hasLowerCase(confirmPassword.value)) {
        setConfirmPasswordErrorMessage('Password must include one lowercase at least.');
      } else if (!hasNumeric(confirmPassword.value)) {
        setConfirmPasswordErrorMessage('Password must include one numeric at least.');
      } else if (!hasSpecialCharacter(confirmPassword.value)) {
        setConfirmPasswordErrorMessage('Password must include one special character at least.');
      } else {
        setConfirmPasswordErrorMessage('Password format is not correct. Try again.');
      }
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('Enough Possible');
    }

    if (newPassword.value === confirmPassword.value) {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    } else {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Password not match!');
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
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={ SignUpTheme }>
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
                    // value={password}
                    // color='primary'
                    // onChange={pwdChange}
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
                    // value={password}
                    // color='primary'
                    // onChange={pwdChange}
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
                <Button
                  type="submit"
                  className='submit-btn roboto-font'
                  // fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  Reset
                </Button>
              </div>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
