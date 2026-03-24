import axios from 'axios';

const api = axios.create({
  baseURL: 'https://0551-102-90-98-19.ngrok-free.app/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally (like token expiration)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If the token is invalid or expired, clear local storage and redirect
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;