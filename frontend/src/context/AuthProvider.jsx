import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/axios'; 

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // This holds John Wick's data

  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('token');
      
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.status === 200) {
          setToken(savedToken);
          setIsAuthenticated(true);
          setUser(response.data); // SUCCESS: Setting the user data here
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // After login, we should fetch the user immediately
    api.get('/auth/me')
      .then(res => setUser(res.data));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = async () => {
  try {
    const response = await api.get('/auth/me');
    if (response.status === 200) {
      setUser(response.data);
    }
  } catch (error) {
    console.error("Failed to refresh user:", error);
  }
};

  return (
    // IMPORTANT: 'user' MUST be included in this value object
    <AuthContext.Provider value={{ token, isAuthenticated, user, login, logout, loading, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};