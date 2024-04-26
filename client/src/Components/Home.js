import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from './Navbar.js';

const books = [
  { id: 1, imageurl:'https://m.media-amazon.com/images/I/71VjmMcE-rL._AC_UF1000,1000_QL80_.jpg', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 24.99, isNew: true },
  { id: 2, imageurl:'https://m.media-amazon.com/images/I/41K1F3Thx4L.jpg', title: 'Pride and Prejudice', author: 'Jane Austen', price: 19.99, isNew: true },
  { id: 3, imageurl:'https://m.media-amazon.com/images/I/811NqsxadrS._AC_UF1000,1000_QL80_.jpg', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 17.99, isNew: true },
  { id: 4, imageurl:'https://m.media-amazon.com/images/I/71IEhPCxwcL._AC_UF1000,1000_QL80_.jpg', title: 'Ambedkar: A Life', author: '	Shashi Tharoor', price: 13.99, isNew: true },
];

const offers = [
  { id: 1, title: 'Summer Reading Sale! Up to 50% off!', discount: 0.5 },
  { id: 2, title: 'Free Shipping on Orders Over $50', condition: 50.00 },
  { id: 3, title: 'Buy One Get One Free on Selected Titles', discount: 1 },
];

const featuredBooks = [
  { id: 4, imageurl:'https://m.media-amazon.com/images/I/7180qjGSgDL._AC_UF1000,1000_QL80_.jpg', title: '1984', author: 'George Orwell', price: 14.99 },
  { id: 5, imageurl:'https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
];

const bestsellers = [
  { id: 6, imageurl:'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSgr_E0dkUX0TXBwMgkc1Fwqe2eoULdW_1M88C_PX_jphC9bbd-0m2filXaqxOFQcAhtqNmJPF37ggoKQ5T5jS305URbs8fi2ru7CmbDeQ3&usqp=CAE', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', price: 19.99 },
  { id: 7, imageurl:'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTkq4DY507S7AZgrtKnY_lUY4txER2RxznM2r-0cIK1dIBax0mFMPjqVf8SxZV37hTpDIJgKudJe72vcxSrdPuQDa1QDWQjXAHGBGGhEiju36BKk2wT1WBA0w&usqp=CAE', title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 16.99 },
];

const recommendedBooks = [
  { id: 8, imageurl:'https://m.media-amazon.com/images/I/71y4X5150dL._AC_UF1000,1000_QL80_.jpg', title: 'The Da Vinci Code', author: 'Dan Brown', price: 15.99 },
  { id: 9, imageurl:'https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg', title: 'The Hunger Games', author: 'Suzanne Collins', price: 13.99 },
];

function Home() {
  return (
    <div>
        <Navbar />
        <br></br>
        <center>
        <h1>Welcome to The Ocean of Pages</h1><br></br>
        <p className='heading'>Your one-stop shop for all your reading needs!</p>
        </center>
      <center>
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <ul className="book-list">
          {books.map(book => (
            <li key={book.id} className="book-item">
              <img src={book.imageurl} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span className="price">${book.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="container3">
        <section className="offers">
          <h2>Current Offers</h2>
          <ul className='subheading'>
            {offers.map(offer => (
              <li key={offer.id}>{offer.title}</li>
            ))}
          </ul>
        </section>
      </div>
      <br></br><br></br>
      <section className="featured-books">
        <h2>Featured Books</h2>
        <ul className="book-list">
          {featuredBooks.map(book => (
            <li key={book.id} className="book-item">
              <img src={book.imageurl} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span className="price">${book.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bestsellers">
        <h2>Bestsellers</h2>
        <ul className="book-list">
          {bestsellers.map(book => (
            <li key={book.id} className="book-item">
              <img src={book.imageurl} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span className="price">${book.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="recommended-books">
        <h2>Recommended Books</h2>
        <ul className="book-list">
          {recommendedBooks.map(book => (
            <li key={book.id} className="book-item">
              <img src={book.imageurl} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span className="price">${book.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
      </center>
    </div>
  );
}

export default Home;
