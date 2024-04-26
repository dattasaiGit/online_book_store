import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.instagram.com"><FaInstagram /></a>&nbsp;&nbsp;
          <a href="https://www.facebook.com"><FaFacebook /></a>&nbsp;&nbsp;
          <a href="https://www.twitter.com"><FaTwitter /></a>&nbsp;&nbsp;
          <a href="mailto:onlinebookstore@gmail.com"><FaEnvelope /></a>&nbsp;&nbsp;
        </div>
        <div className="copy-right">
          &copy; 2024 Online Book Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
