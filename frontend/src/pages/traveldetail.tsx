import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';

interface FlightDetail {
  origin: string;
  destination: string;
  numberOfStops: number;
  price: number;
}

const TravelDetail: React.FC = () => {
  const flights: FlightDetail[] = [
    {
      origin: 'Stockholm',
      destination: 'London',
      numberOfStops: 1,
      price: 2500
    },
    {
      origin: 'London',
      destination: 'New York',
      numberOfStops: 2,
      price: 5000
    }
  ];

  const flightsJson = JSON.stringify(flights, null, 2);

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Flight Details
      </Typography>
      <Grid container spacing={3}>
        {flights.map((flight, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">
                Flight {index + 1}
              </Typography>
              <Typography variant="body1">
                <strong>Origin:</strong> {flight.origin}
              </Typography>
              <Typography variant="body1">
                <strong>Destination:</strong> {flight.destination}
              </Typography>
              <Typography variant="body1">
                <strong>Number of Stops:</strong> {flight.numberOfStops}
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> {flight.price} SEK
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box marginTop={4}>
        <Typography variant="h5" gutterBottom>
          Flight Details JSON
        </Typography>
        <pre>{flightsJson}</pre>
      </Box>
    </Box>
  );
};

export default TravelDetail;
