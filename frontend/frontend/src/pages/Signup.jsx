import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const register = async () => {
    try {
      const res = await api.post('/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch (err) {
      alert('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="auth-page">
      <h1>Create Account</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
