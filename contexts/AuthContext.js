import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(true);

  // Initialize as guest mode - always start clean
  useEffect(() => {
    // Clear any existing user data to ensure guest mode
    localStorage.removeItem('user');
    localStorage.removeItem('userListing'); // Remove any scanner-created listings
    setUser(null);
    setIsGuest(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isGuest,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
