import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Footer({ push }) {
  return (
    <>
      <Box
        component='footer'
        sx={{
          py: 6,
          px: 2,
          mt: push ? 'auto' : 0,
        }}
      >
        <Container
          maxWidth='sm'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant='body2' color='text.secondary'>
            {'Copyright © Mateo Tiedra '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
      <Box sx={{ height: 90, display: { md: 'none' } }} />
    </>
  );
}

export default Footer;
