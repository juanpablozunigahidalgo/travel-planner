import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomepage';
import MainPage from './pages/mainpage';
import TravelDetail from './pages/traveldetail';
import ProfilePage from './pages/profilepage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/traveldetail" element={<TravelDetail/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;