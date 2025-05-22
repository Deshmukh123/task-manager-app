import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import '../styles/AuthForm.css'; // Assuming you have some styles for the auth form

const AuthForm = ({ onSubmit, isLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
