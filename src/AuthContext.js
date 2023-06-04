import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be called within an AuthProvider');

  const { token, login, logout } = auth;
  const isAuthenticated = () => {
    return token !== '';
  };

  return {
    token,
    login,
    logout,
    isAuthenticated,
  };
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Initialize token as empty string

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const isAuthenticated = () => {
    return token !== '';
  };

  const value = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
