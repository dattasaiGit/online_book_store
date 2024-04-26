import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import './ChangePassword.css'

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/Changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({
          username: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        console.error('Failed to change password:', data.error);
        alert('Failed to change password. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please try again.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className='container1'>
      <div className="change-password-page">
        <div className="change-password-wrapper">
          <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
              <br></br>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Current Password"
                required
              />
              <br></br>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                required
              />
              <br></br>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                required
              />
              <br></br>
              <button type="submit">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;