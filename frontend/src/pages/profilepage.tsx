import React from 'react';
import { Typography, Container, Card, CardContent } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage: React.FC = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    // Redirect to login page if user is not authenticated
    loginWithRedirect();
    return null; // Prevent rendering until redirect happens
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Typography>
            <strong>Name:</strong> {user?.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography>
            <strong>Preferred Username:</strong> {user?.nickname}
          </Typography>
          <Typography>
            <strong>Login Method:</strong> {user?.identities && user.identities.length > 0 ? user.identities[0].provider : 'N/A'}
          </Typography>
          {/* You can display more user information here */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;