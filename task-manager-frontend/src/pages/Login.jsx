import React from 'react';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return <AuthForm onSubmit={handleLogin} isLogin={true} />;
};

export default Login;