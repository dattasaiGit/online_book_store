import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Navbar.css'
import ShowNavBar from './ShowNavbar';

export default function NavBar() {
  return (
    <div>
      <ShowNavBar>
      <ul className='navbar'>
      <center><li className='navbar-heading' ><Link to="/">The Ocean of Pages</Link></li></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      </ShowNavBar>
    </div>
  );
}