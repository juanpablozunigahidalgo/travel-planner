import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppToolbar from '../components/apptoolbar';

const tripLengths = ['3 days', '1 week', '10 days', '2 weeks', '1 month'];
const travelTypes = ['Sun and beach', 'Big cities', 'Mountains', 'Lakes and Forests'];
const airports = ['Stockholm', 'Göteborg', 'Copenhagen'];
const budgets = [1500, 3000, 8000];

const airportCodes: { [key: string]: string } = {
  'Stockholm': 'ARN',
  'Göteborg': 'GOT',
  'Copenhagen': 'CPH'
};

const travelTypeToDestination: { [key: string]: string[] } = {
  'Sun and beach': ['HER'],
  'Big cities': ['LON'],
  'Mountains': ['BGY'],
  'Lakes and Forests': ['HEL']
};

const calculateReturnDate = (tripLength: string): { departureDate: string, returnDate: string } => {
  const today = new Date();
  let daysToAdd;

  switch (tripLength) {
    case '3 days':
      daysToAdd = 3;
      break;
    case '1 week':
      daysToAdd = 7;
      break;
    case '10 days':
      daysToAdd = 10;
      break;
    case '2 weeks':
      daysToAdd = 14;
      break;
    case '1 month':
      daysToAdd = 30;
      break;
    default:
      daysToAdd = 0;
  }

  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + daysToAdd);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return {
    departureDate: formatDate(today),
    returnDate: formatDate(returnDate)
  };
};

const fetchTrips = async (
  departureAirport: string,
  destinationAirports: string[],
  departureDate: string,
  returnDate: string,
  budget: string,
): Promise<void> => {
  // Amadeus API credentials
  const API_KEY = 'efCS9GxpkgV9Vs2KXMNGzft5dplnMeqA';
  const API_SECRET = 'TZ5wfyZNHy3SH6PR';

  // Step 1: Obtain the access token
  const authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const authParams = new URLSearchParams();
  authParams.append('grant_type', 'client_credentials');
  authParams.append('client_id', API_KEY);
  authParams.append('client_secret', API_SECRET);

  let accessToken: string;
  try {
    const authResponse = await axios.post(authUrl, authParams);
    accessToken = authResponse.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }

  // Step 2: Fetch flight offers from Amadeus
  const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
  const formattedDepartureDate = new Date(departureDate).toISOString().split('T')[0];
  const formattedReturnDate = new Date(returnDate).toISOString().split('T')[0];

  const tripsPromises = destinationAirports.map(async (destinationAirport) => {
    const params = {
      originLocationCode: departureAirport,
      destinationLocationCode: destinationAirport,
      departureDate: formattedDepartureDate,
      returnDate: formattedReturnDate,
      adults: 1,
      travelClass: 'ECONOMY',
      maxPrice: budget,
      currencyCode: 'SEK',
      max: 5,
    };

    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    try {
      const response = await axios.get(url, { params, headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  });

  try {
    const trips = await Promise.all(tripsPromises);
    console.log('Trips:', trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

const MainPage: React.FC = () => {
  const { logout, user } = useAuth0();
  const [tripLength, setTripLength] = useState<string>('');
  const [travelType, setTravelType] = useState<string>('');
  const [airport, setAirport] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTripLength = sessionStorage.getItem('tripLength');
    const storedTravelType = sessionStorage.getItem('travelType');
    const storedAirport = sessionStorage.getItem('airport');
    const storedBudget = sessionStorage.getItem('budget');

    if (storedTripLength) setTripLength(storedTripLength);
    if (storedTravelType) setTravelType(storedTravelType);
    if (storedAirport) setAirport(storedAirport);
    if (storedBudget) setBudget(storedBudget);
  }, []);

  const handleSend = async () => {
    const { departureDate, returnDate } = calculateReturnDate(tripLength);
    const destinations = travelTypeToDestination[travelType];
  
    const departureAirportCode = airportCodes[airport];

    if (destinations && destinations.length > 0) {
      await fetchTrips(departureAirportCode, destinations, departureDate, returnDate, budget);
    }
  
    sessionStorage.setItem('tripLength', tripLength);
    sessionStorage.setItem('travelType', travelType);
    sessionStorage.setItem('airport', airport);
    sessionStorage.setItem('budget', budget);
    
    navigate('/traveldetail');
  };

  return (
    <>
    <AppToolbar/>
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Plan Your Trip
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="airport-label">Initial Airport</InputLabel>
            <Select
              labelId="airport-label"
              value={airport}
              onChange={(e) => setAirport(e.target.value as string)}
              label="Initial Airport"
            >
              {airports.map((airport) => (
                <MenuItem key={airport} value={airport}>
                  {airport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="trip-length-label">Trip Length</InputLabel>
            <Select
              labelId="trip-length-label"
              value={tripLength}
              onChange={(e) => setTripLength(e.target.value as string)}
              label="Trip Length"
            >
              {tripLengths.map((length) => (
                <MenuItem key={length} value={length}>
                  {length}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="travel-type-label">Travel Type</InputLabel>
            <Select
              labelId="travel-type-label"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value as string)}
              label="Travel Type"
            >
              {travelTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="budget-label">Budget</InputLabel>
            <Select
              labelId="budget-label"
              value={budget}
              onChange={(e) => setBudget(e.target.value as string)}
              label="Budget"
            >
              {budgets.map((budget) => (
                <MenuItem key={budget} value={budget.toString()}>
                  {budget} SEK
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default MainPage;
