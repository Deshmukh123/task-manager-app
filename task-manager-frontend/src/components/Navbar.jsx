import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;