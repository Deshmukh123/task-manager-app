import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios'; // Make sure this exports a configured Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Fetch user info if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Optionally hit a /me or /profile endpoint
          const res = await API.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await API.post(
        '/auth/login',
        new URLSearchParams({ username, password }), // Form data format
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser({ username }); // or fetch actual user data if needed
    } catch (err) {
      console.error('Login error:', err);
      throw err; // Let the UI handle the error
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
