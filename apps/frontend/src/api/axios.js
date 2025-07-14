import axios from 'axios';
import { refreshAccessToken } from '../services/authServices';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
  withCredentials: true,                // allow sending cookies (refresh token)
});

// Request Interceptor — attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — handle 401 & refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const data = await refreshAccessToken(); // refresh access token
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login'; // optional: redirect to login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
