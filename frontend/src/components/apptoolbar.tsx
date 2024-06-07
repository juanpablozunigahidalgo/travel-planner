import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AppToolbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate(); // Using the useNavigate hook to get the navigate function

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin + '' } }); // Logging out with returnTo parameter
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Using the navigate function to navigate to the profile page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Travel Planner
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="h6">
              Welcome, {user?.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Log Out
            </Button>
            <Button color="inherit" onClick={handleProfileClick}>
              Profile
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => loginWithRedirect()}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
