import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLogin }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      {!isLogin && (
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      )}
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
