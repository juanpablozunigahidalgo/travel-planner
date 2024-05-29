import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WelcomePage from './pages/welcomepage';
import MainPage from './pages/mainpage';

const theme = createTheme();

const App: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Travel Planner
            </Typography>
            {isAuthenticated && (
              <>
                <Typography variant="h6">
                  Welcome, {user?.name}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
