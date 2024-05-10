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
import { Card as MuiCard } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { hasUpperCase, hasLowerCase, hasNumeric, hasSpecialCharacter, isEmail } from '../../validation';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import getSignUpTheme from './getSignUpTheme';
import ToggleColorMode from './ToggleColorMode';
import { SitemarkIcon } from './CustomIcons';
import { commonStyles } from '../../style';

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
    width: '450px',
  },
}));

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
  const classes = commonStyles();
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState('Password must be longer than 8 characters. Also it must include one numeric, one special character, one upper case, one lower case at least.');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [newVisible, setNewVisible] = React.useState(false);
  const [newType, setNewType] = React.useState('password');
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [confirmType, setConfirmType] = React.useState('password');

  const validateInputs = () => {
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!newPassword.value || newPassword.value.length < 8 || !hasUpperCase(newPassword.value) || !hasLowerCase(newPassword.value) || !hasNumeric(newPassword.value) || !hasSpecialCharacter(newPassword.value)) {
      setNewPasswordError(true);
      if (!newPassword.value || newPassword.value.length < 8) {
        setNewPasswordErrorMessage('Password must be at least 8 characters long.');
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

    if (!confirmPassword.value || confirmPassword.value.length < 8 || !hasUpperCase(confirmPassword.value) || !hasLowerCase(confirmPassword.value) || !hasNumeric(confirmPassword.value) || !hasSpecialCharacter(confirmPassword.value)) {
      setConfirmPasswordError(true);
      if (!confirmPassword.value || confirmPassword.value.length < 8) {
        setConfirmPasswordErrorMessage('Password must be at least 8 characters long.');
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

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
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
              component="h1"
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
                <FormLabel htmlFor="new-password">New Password</FormLabel>
                <div className={classes.passwordBox}>
                  <TextField
                    required
                    fullWidth
                    name="new-password"
                    placeholder="••••••••"
                    type={newType}
                    id="new-password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={newPasswordError}
                    helperText={newPasswordErrorMessage}
                    color={newPasswordError ? 'error' : 'primary'}
                  />
                  <span className={classes.visibilityBox}>
                    {newVisible ? <VisibilityIcon className={classes.visibility1} onClick={handleNewVisibility} /> : <VisibilityOffIcon className={classes.visibility2} onClick={handleNewVisibility} />}
                  </span>
                </div>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                <div className={classes.passwordBox}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    placeholder="••••••••"
                    type={confirmType}
                    id="confirm-password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={confirmPasswordError}
                    helperText={confirmPasswordErrorMessage}
                    color={confirmPasswordError ? 'error' : 'primary'}
                  />
                  <span className={classes.visibilityBox}>
                    {confirmVisible ? <VisibilityIcon className={classes.visibility1} onClick={handleConfirmVisibility} /> : <VisibilityOffIcon className={classes.visibility2} onClick={handleConfirmVisibility} />}
                  </span>
                </div>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Reset
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
