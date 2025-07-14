import axios from '../api/axios'; 

// Signup
export const signup = async (userData) => {
  const res = await axios.post('/auth/signup', userData);
  return res.data;
};

// Login
export const login = async (credentials) => {
  const res = await axios.post('/auth/login', credentials, {
    withCredentials: true, 
  });
  return res.data;
};

// Logout
export const logout = async () => {
  const res = await axios.post('/auth/logout', {}, {
    withCredentials: true,
  });
  return res.data;
};

// Get current user (from access token)
export const getCurrentUser = async () => {
  const res = await axios.get('/auth/current-user');
  return res.data;
};

// Refresh token
export const refreshAccessToken = async () => {
  const res = await axios.get('/auth/refresh-token', {
    withCredentials: true,
  });
  return res.data;
};
