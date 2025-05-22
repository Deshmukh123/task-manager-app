import axios from 'axios';

const API_URL = 'http://localhost:8000/auth';

export const loginUser = async (form) => {
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return { data };
};


export const register = async (form) => {
  const response = await fetch('http://localhost:8000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return { data };
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