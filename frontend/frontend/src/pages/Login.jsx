import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const nav = useNavigate();

  const login = async () => {
    try {
      const { data } = await api.post('auth/login', { email: u, password: p });
      localStorage.setItem('token', data.token);
      nav('/dashboard');
    } catch {
      alert('Check your credentials.');
    }
  };

  return (
    <div className="auth-page">
      <h1>Log in</h1>
      <input placeholder="Email" value={u} onChange={e => setU(e.target.value)} />
      <input type="password" placeholder="Password" value={p} onChange={e => setP(e.target.value)} />
      <button onClick={login}>Submit</button>
    </div>
  );
}
