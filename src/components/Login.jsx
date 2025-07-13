import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function doLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // const token = response.data.data; 
        const userName = response.data.userName; 
        localStorage.setItem("userId", response.data.userId);
        const email = response.data.email; 
        const status = response.data.status;
        const user_type = response.data.user_type;  

        // Cookies.set('authToken', token, { expires: 1 }); 
        Cookies.set('userName', userName, { expires: 1 });
        Cookies.set('email', email, { expires: 1 });
        Cookies.set('status', status, { expires: 1 });
        Cookies.set('user_type', user_type, { expires: 1 });

        navigate('/template');
        alert('Login Successfully!');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.log('Login error:', err);
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  }

  return (
    <div className="login-page">
      <nav className="navbar">
        <Link to="/signup" className="nav-link">Signup</Link>
        <Link to="/" className="nav-link">Login</Link>
      </nav>

      <div className="welcome-banner">
        <h2>Welcome to Electronics Website!</h2>
      </div>

      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={doLogin}>
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
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
