import axios from 'axios';

const API_URL = 'http://localhost:8000/auth';

export const loginUser = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post(`${API_URL}/login`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }

  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token'); // ✅ This line was missing
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000;
  return Date.now() < exp;
};