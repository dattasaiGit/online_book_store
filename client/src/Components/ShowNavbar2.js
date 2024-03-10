import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ShowNavBar2({ children }) {
  const location = useLocation();
  const [showNavBar, setShowNavBar2] = useState('');

  useEffect(() => {
    if (
      location.pathname === '/home' ||
      location.pathname === '/about' ||
      location.pathname === '/login' ||
      location.pathname === '/register' ||
      location.pathname === '/contact' 
    ) {
      setShowNavBar2(false);
    } else {
      setShowNavBar2(true);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
}
