import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import Snackbar from '@mui/joy/Snackbar';
import api from '../../utils/api';

import axios from 'axios';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [snackState, setSnackState] = useState({
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
    message: ""
  });
  const { vertical, horizontal, snackOpen, message } = snackState;

  useEffect(() => {
    setSnackState({
      snackOpen: false,
      vertical: 'top',
      horizontal: 'center',
      message: ""
    });
  }, [])

  useEffect(() => {
    const data = {
      email: location.pathname.split('/verify/')[0].split('/')[1],
      token: location.pathname.split('/verify/')[1]
    };
    const token = location.pathname.split("/verify/")[1];
    const verifyEmail = async () => {
      try {
        const response = await api.post(`users/verify`, data);
        if (response.data.success) {
          setSnackState({
            snackOpen: true,
            vertical: 'top',
            horizontal: 'center',
            message: "Your email verification was successed!"
          });
          setTimeout(() => {
            navigate('/');
          }, 3000)
        } else {
          console.error("reached, but can't verify");
          setSnackState({
            snackOpen: true,
            vertical: 'top',
            horizontal: 'center',
            message: "Your email verification was failed!"
          });
          setTimeout(() => {
            navigate('/sign-up');
          }, 3000)
        }
      } catch (error) {
        setSnackState({
          snackOpen: true,
          vertical: 'top',
          horizontal: 'center',
          message: "Your email verification was failed!"
        });
        setTimeout(() => {
          navigate('/sign-up');
        }, 3000)
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setSnackState({
        snackOpen: true,
        vertical: 'top',
        horizontal: 'center',
        message: "Email verification expired! Try again."
      });
      setTimeout(() => {
        navigate('/sign-up');
      }, 5000)
    }
  }, [navigate, location]);

  return (
    <div>
      <Stack
        alignItems={"center"}
        justifyContent="center"
        sx={{ height: { xs: '100%', sm: '100dvh' }, p: 2 }}
      >
        <CircularProgress size="lg" />
      </Stack>
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
    </div>
  )
};

export default EmailVerificationSuccess;