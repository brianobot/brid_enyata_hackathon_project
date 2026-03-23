import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/axios'; // Use the new axios instance we created

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('token');
      
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        // Using the Axios instance handles the BaseURL and Headers automatically
        const response = await api.get('/users/me');

        if (response.status === 200) {
          setToken(savedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // If status is 401, the Axios interceptor will handle the logout
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
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};