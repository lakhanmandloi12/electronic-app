import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function doSignup(e) {
    e.preventDefault();

    if (!userName || !email || !password || !status ) {
      setErrorMessage('All fields are required.');
      return;
    }

    
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/signup', {
        userName,
        email,
        password,
        status
      });

      if (response.status === 201) {
  

        navigate('/');
        alert('Signup Successful!');
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (err) {
      console.log('Signup error:', err);
      setErrorMessage('Signup failed. Please try again.');
    }
  }

  return (
    <div className="signup-page">
      <nav className="navbar">
        <Link to="/signup" className="nav-link">Signup</Link>
        <Link to="/" className="nav-link">Login</Link>
      </nav>

      <div className="welcome-banner">
        <h2>Welcome to Electronics Website!</h2>
      </div>

      <div className="signup-container">
        <div className="signup-form">
          <h1>Signup</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={doSignup}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
             </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              />
            </div>

            <button type="submit" className="submit-btn">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
