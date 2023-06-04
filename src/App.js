import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './AuthContext';
import Login from './components/login';
import Dashboard from './components/dashboard';

function App() {
  const { isAuthenticated } = useAuth();
console.log(isAuthenticated());
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
