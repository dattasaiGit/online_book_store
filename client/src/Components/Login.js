import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from './Navbar';

const Login = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
   
    if (username === 'admin' && password === 'admin') {
      console.log('Admin login successful');
      setUserRole('admin');
      navigate('/admin-dashboard');
    } else if (username === username && password === password) {
      console.log('User login successful');
      setUserRole('user');
      navigate('/CustomerHome');
    } else {
      console.error('Login failed: Invalid credentials');
    }
  };

  return (
    <div>
      <NavBar/>
    <div className="parent1">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <br></br>
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
          <br></br>
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
