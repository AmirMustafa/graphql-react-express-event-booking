import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import NotFound from './pages/NotFound';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  }

  const logout = () => {
    setToken(null);
    setUserId(null);
  }

  return (
    <Router>
      <AuthContext.Provider value={{ token: token, userId: userId, login: (token, userId, tokenExpiration) => login(token, userId, tokenExpiration), logout: () => logout() }}>
        <MainNavigation />
        <div className="main-content">
          <Routes>
            {/* Redirect from root to /about */}
            {token && <Route path="/" element={<Navigate to="/events" />} />}
            {token && <Route path="/auth" element={<Navigate to="/events" />} />}

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/events" element={<EventsPage />} />
            {token && <Route path="/bookings" element={<BookingsPage />} />}

            {!token && <Route path="/" element={<Navigate to="/auth" />} />}
            {!token && <Route path="/bookings" element={<Navigate to="/auth" />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
