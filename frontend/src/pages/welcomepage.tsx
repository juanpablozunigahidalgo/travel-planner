import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const WelcomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h3" gutterBottom>
        Welcome to Travel Planner
      </Typography>
      {!isAuthenticated && (
        <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
    </Box>
  );
};

export default WelcomePage;