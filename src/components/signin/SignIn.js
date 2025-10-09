import React, { useState } from 'react';
import './signin.css';

const SignIn = ({ onRouteChange, loadUser, backend }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!backend) return alert('Backend URL not set!');
    fetch(`${backend}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        } else {
          alert('Wrong credentials');
        }
      })
      .catch(err => {
        console.error('SignIn error:', err);
        alert('Error connecting to backend');
      });
  };

  return (
    <div className="signin-wrapper">
      {/* Welcome text above form */}
      <div className="welcome-text">
        Welcome to Magic Brain! Detect faces in your images instantly and effortlessly.
      </div>

      <div className="signin-box">
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="button" onClick={onSubmit}>Sign In</button>
        <p onClick={() => onRouteChange('register')}>Register</p>
      </div>
    </div>
  );
};

export default SignIn;
