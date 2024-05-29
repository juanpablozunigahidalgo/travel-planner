import React from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const seasons = ['Summer', 'Winter', 'Autumn', 'Spring'];

const MainPage: React.FC = () => {
  const { logout, user } = useAuth0();

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Choose Your Season
      </Typography>
      <Grid container spacing={2}>
        {seasons.map((season) => (
          <Grid item xs={12} sm={6} md={3} key={season}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6">{season}</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Explore
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
