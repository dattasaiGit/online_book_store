import React from 'react';
import Navbar3 from './Navbar3';
import './adminhome.css'; 

const AdminHome = () => {
  return (
    <div>
      <Navbar3 />
      <div className='admin-home'>
        <center><h1>Welcome to the Admin Dashboard</h1></center>
      </div>
    </div>
  );
};

export default AdminHome;
