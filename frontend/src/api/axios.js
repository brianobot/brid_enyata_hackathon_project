import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brid-enyata-hackathon-project.onrender.com/v1',  // Relative to your dev server, will be proxied
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
    const isPublicRoute = error.config?.url?.includes('/businesses/');
    if (error.response?.status === 401 && !isPublicRoute) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;