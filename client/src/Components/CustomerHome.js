import React from 'react';
import Navbar2 from './Navbar2';
import './CustomerHome.css'; 

const CustomerHome = () => {
  return (
    <div>
      <Navbar2 />
      <div className='admin-home'>
        <h1>Our online bookstore welcomes you with personalized book recommendations, showcasing the latest releases and enticing deals. Explore curated categories, manage your wishlist, and track your orders effortlessly. Stay updated on literary news and immerse yourself in a tailored browsing experience designed just for you. Happy reading!</h1>
      </div>
    </div>
  );
};

export default CustomerHome;
