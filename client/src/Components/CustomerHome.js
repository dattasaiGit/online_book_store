import React from 'react';
import Navbar2 from './Navbar2';
import './CustomerHome.css'
import Footer from './Footer.js'

const CustomerHome = () => {
  return (
    <div>
    <Navbar2/>
    <div className="homepage">
      <header>
        <h1>Welcome to Our Online Bookstore</h1>
      </header>
      <main>
        <section className="featured-books">
          <h2>Featured Books</h2>
          <div className="book-list">
            <div className="book">
            <img src="https://m.media-amazon.com/images/I/71KKZlVjbwL._SY466_.jpg" alt="Book Cover" />
              <h3>Wings of Fire</h3>
              <p>APJ Abdul Kalam</p>
            </div>
            <div className="book">
              <img src="https://m.media-amazon.com/images/I/91+t0Di07FL._SY466_.jpg" alt="Book Cover" />
              <h3>The Intelligent Investor</h3>
              <p>Benjamin Graham</p>
            </div>
            <div className="book">
              <img src="https://m.media-amazon.com/images/I/A107128OO2L._AC_UY327_FMwebp_QL65_.jpg" alt="Book Cover" />
              <h3>The Lord of the Rings</h3>
              <p>J.R.R. Tolkien</p>
            </div>
          </div>
        </section>
        <section className="discounts-offers">
            <h2>Special Offers</h2>
            <div className="offer">
              <p>Get 10% off on all fiction books! Use code FICTION10 at checkout.</p>
            </div>
            <div className="offer">
              <p>Buy one, get one free on selected titles. Limited time offer!</p>
            </div>
          </section>
      </main>
      <Footer/>
    </div>
    </div>
  );
};

export default CustomerHome;
