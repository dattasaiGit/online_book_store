import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import setShowNavber2 from './ShowNavbar2'

export default function ShowNavBar({ children }) {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState('');

  useEffect(() => {
    if (
      location.pathname === '/cart' ||
      location.pathname === '/myorders' ||
      location.pathname === '/navbar2' ||
      location.pathname === '/books' ||
      location.pathname === '/profile'
    ) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
}
