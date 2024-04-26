import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from './Navbar';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        
        console.log('User session timed out');
        setUserRole(null);
        navigate('/login');
        alert('Session expired due to inactivity. Please login again.');
      }, 30*100); 
    };

    const clearEvents = () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', resetTimeout);
      document.removeEventListener('keydown', resetTimeout);
    };

    resetTimeout();

    document.addEventListener('mousemove', resetTimeout);
    document.addEventListener('keydown', resetTimeout);

    return clearEvents;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (username === 'admin' && password === 'admin') {
        console.log('Admin login successful');
        setUserRole('admin');
        navigate('/admin-dashboard');
        alert('Admin login successful'); 
      } else {
        const response = await axios.post('http://localhost:8081/login', {
          username,
          password
        });
        if (response.status === 200) {
          console.log('Login successful');
          const user = response.data;
          setUserRole(user.role);
          navigate(user.role === 'admin' ? '/admin-dashboard' : '/customerHome');
          alert('Login successful'); 
        } else {
          console.error('Login failed: Invalid credentials');
          alert('Login failed: Invalid credentials'); 
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login'); 
    }
  };

  return (
    <div>
      <NavBar />
      <div className="parent1">
        <div className="wrapper">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <br />
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <br />
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />Remember_me
              </label>
              <a href=" ">Forgot Password?</a>
            </div>

            <button type="submit">Login</button>
            <div className="register-link">
              <p style={{ fontSize: '18px' }}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;