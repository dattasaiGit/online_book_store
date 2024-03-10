import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import ShowNavBar from './ShowNavbar2';


const Navbar2 = () => {
  return (
    <div>
      <ShowNavBar>
      <ul className='navbar'>
      <center><li className='navbar-heading' ><Link to="/">Online Book Store</Link></li></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/cart">Cart</Link></li> 
        <li><Link to="/myorders">My Orders</Link></li>
        <li><Link to="/changepassword">Change Password</Link></li>
        <li><Link to="/home">Logout</Link></li>
      </ul>
      </ShowNavBar>
    </div>
  );
};
export default Navbar2;
