import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CategoryButton from './CategoryButton';
// import Upload from './Upload';
import CustomizedTables from './Table'



export default function Content() {

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundColor: '#ffffff',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          width: '100% !important',
          background: '#ffffff',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 4, sm: 6 },
        }}
      >
        <Stack
          spacing={2}
          className='assist-root'
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' } }}
        >
          <Stack
            className='func-box'
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="email-hero"
              hiddenLabel
              InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto' } }}
              className='global-font search-box'
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Search"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
                style: {
                  fontSize: 16,
                  // borderRadius: 0,
                  fontFamily: 'roboto',
                  // backgroundColor: '#fff',
                  height: '32px'
                }
              }}
            />
            <CategoryButton
              className='global-font category-box'
            />
            {/* <Upload /> */}
            <Button variant="contained" color="primary" className='doc-upload-btn' >
              Upload
            </Button>
          </Stack>
        </Stack>
        <CustomizedTables />
      </Container>
    </Box>
  );
}
