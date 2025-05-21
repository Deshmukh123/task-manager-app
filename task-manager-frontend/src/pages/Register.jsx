import React from 'react';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    try {
      await registerUser(form);
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  };

  return <AuthForm onSubmit={handleRegister} isLogin={false} />;
};

export default Register;