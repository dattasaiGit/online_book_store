import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import ShowNavBar from './ShowNavbar2';


const Navbar3 = () => {
  return (
    <div>
      <ShowNavBar>
      <ul className='navbar'>
      <center><li className='navbar-heading' ><Link to="/">Online Book Store</Link></li></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <li><Link to="/addbooks">Add Books</Link></li>
        <li><Link to="/users">Users</Link></li> 
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/statistics">Statistics</Link></li>
        <li><Link to="/home">Logout</Link></li>
      </ul>
      </ShowNavBar>
    </div>
  );
};
export default Navbar3;
