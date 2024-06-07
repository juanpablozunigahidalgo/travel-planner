import React, { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main');
    }
  }, [isAuthenticated, navigate]);

  const handleProceedWithoutProfile = () => {
    navigate('/main'); // Directly navigate to MainPage without login
    console.log('Proceeding without profile');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h3" gutterBottom>
        Welcome to Travel Planner
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log In
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleProceedWithoutProfile} style={{ marginTop: '16px' }}>
        Proceed Without Profile
      </Button>
    </Box>
  );
};

export default WelcomePage;
