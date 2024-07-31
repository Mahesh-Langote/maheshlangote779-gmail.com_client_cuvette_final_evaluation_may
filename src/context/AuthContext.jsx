 
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const refreshAuthState = () => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    setIsLoggedIn(!!token);
    setUserName(storedUserName || '');
  };

  useEffect(() => {
    refreshAuthState();
  }, []);

  const login = (token, name) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);
    refreshAuthState();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    refreshAuthState();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout, refreshAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};