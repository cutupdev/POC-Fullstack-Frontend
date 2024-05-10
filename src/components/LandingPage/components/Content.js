import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CategoryButton from './CategoryButton';
import Upload from './Upload';
import { commonStyles } from '../../../style';
import Typography from '@mui/material/Typography';

import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';

import CustomizedTables from './Table'


export default function Hero() {
  const classes = commonStyles();

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)'
            : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        
        sx={{
          display: 'flex',
          width: '100% !important',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 4, sm: 6 },
        }}
      >
        <Stack
          spacing={2}
          className={classes.assistRoot}
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' } }}
        >
          <Stack
            className={classes.funcBox}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            />
            <CategoryButton />
            <Upload />
            <Button variant="contained" color="primary">
              Start now
            </Button>
          </Stack>
          
        </Stack>
        <CustomizedTables />
      </Container>
    </Box>
  );
}
