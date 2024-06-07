import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRoutes from './router';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <AppRoutes />
      </Container>
    </ThemeProvider>
  );
};

export default App;
