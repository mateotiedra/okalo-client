import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { HashLink } from 'react-router-hash-link';

import AlertPageLogic from './AlertPageLogic';
import Navbar from '../Navbar/Navbar';
import UnderlinedTitle from '../UnderlinedTitle/UnderlinedTitle';
import LoadingButton from '@mui/lab/LoadingButton';

function AlertPage({ title, body, ctaButtons, error, ...props }) {
  const { goHomeAction } = AlertPageLogic();

  return (
    <>
      <Navbar coverPage empty goHomeAction={goHomeAction} />
      <Container
        {...props}
        maxWidth='md'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          py: 8,
          px: 6,
        }}
      >
        <UnderlinedTitle color={error ? 'error.main' : 'primary.main'}>
          {title}
        </UnderlinedTitle>
        {typeof body === 'string' ? (
          <Typography variant='body1'>{body}</Typography>
        ) : (
          body
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 3,
            width: '100%',
          }}
        >
          {ctaButtons &&
            ctaButtons.map(({ sx, onClick, text, to, ...button }) => {
              return (
                <LoadingButton
                  sx={{ width: '100%', ...sx }}
                  variant='contained'
                  onClick={onClick}
                  key={text}
                  component={Boolean(to) ? HashLink : undefined}
                  to={to}
                  {...button}
                >
                  <Typography variant='body1'>{text}</Typography>
                </LoadingButton>
              );
            })}
        </Box>
      </Container>
    </>
  );
}

export default AlertPage;
