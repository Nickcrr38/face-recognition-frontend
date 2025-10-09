import React, { useState } from 'react';
import './register.css';

const Register = ({ loadUser, onRouteChange, backend }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!backend) return alert('Backend URL not set!');
    fetch(`${backend}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        } else {
          alert('Error registering user');
        }
      })
      .catch(err => {
        console.error('Register error:', err);
        alert('Error connecting to backend');
      });
  };

  return (
    <div className="register-wrapper">
      {/* Welcome text above form */}
      <div className="welcome-text">
        Welcome to Magic Brain! Create an account and start detecting faces instantly.
      </div>

      <div className="register-form">
        <h2>Register</h2>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={onSubmit}>Register</button>
        <div className="login-link">
          Already have an account? <span onClick={() => onRouteChange('signin')}>Sign In</span>
        </div>
      </div>
    </div>
  );
};

export default Register;

