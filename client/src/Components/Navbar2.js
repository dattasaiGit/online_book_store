import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import ShowNavBar from './ShowNavbar2';


const Navbar2 = () => {
  return (
    <div>
      <ShowNavBar>
      <ul className='navbar'>
      <center><li className='navbar-heading' ><Link to="/"></Link></li></center>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/cart">Cart</Link></li> 
        <li><Link to="/myorders">Orders</Link></li>
        <li><Link to="/changepassword">Reset Password</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/home">Logout</Link></li>
      </ul>
      </ShowNavBar>
    </div>
  );
};
export default Navbar2;
