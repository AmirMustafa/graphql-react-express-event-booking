import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import NotFound from './pages/NotFound';
import MainNavigation from './components/Navigation/MainNavigation';

import './App.css';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <div className="main-content">
        <Routes>
          {/* Redirect from root to /about */}
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
