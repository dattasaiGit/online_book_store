import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/changepassword', {
        oldPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar2/>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;