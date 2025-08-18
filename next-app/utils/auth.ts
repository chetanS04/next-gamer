// lib/auth.ts
import axios from './axios';

// 1. Get CSRF cookie (required before login/logout/register)

// 2. Register
export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  return axios.post('/api/register', data);
};

// 3. Login
export const login = async (email: string, password: string) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data; // return the full response data
};


// 4. Logout
export const logout = async () => {
  localStorage.removeItem('user'); // Optional: remove cached user
  return axios.post('/api/logout');
};

// 5. Get current authenticated user
export const getUser = () => axios.get('/api/user');
