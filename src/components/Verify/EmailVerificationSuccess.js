import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import Snackbar from '@mui/joy/Snackbar';

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
    const token = location.pathname.split("verify/")[1];
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://0f28-45-8-22-59.ngrok-free.app/api/users/verify/${token}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          }
        });
        if (response.data.success) {
          setSnackState({
            snackOpen: true,
            vertical: 'top',
            horizontal: 'center',
            message: "Your email verification was successed!"
          });
          setTimeout(() => {
            navigate('/');
          }, 5000)
        } else {
          console.error("reached, but can't verify");
          setSnackState({
            snackOpen: true,
            vertical: 'top',
            horizontal: 'center',
            message: "Unfortunately your email verification was failed. Please try agian or contact with support team."
          });
          setTimeout(() => {
            navigate('/sign-up');
          }, 50000)
        }
      } catch (error) {
        setSnackState({
          snackOpen: true,
          vertical: 'top',
          horizontal: 'center',
          message: "Unfortunately your email verification was failed. Please try agian or contact with support team."
        });
        setTimeout(() => {
          navigate('/sign-up');
        }, 5000)
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setSnackState({
        snackOpen: true,
        vertical: 'top',
        horizontal: 'center',
        message: "Email verification token not found! Try again."
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
        autoHideDuration={10000}
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