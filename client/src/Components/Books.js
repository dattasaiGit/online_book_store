import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';
import Navbar2 from './Navbar2';
import Cart from './Cart'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState(0); // State to track selected rating

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getbooks');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const addToCart = async (book) => {
    try {
      await axios.post('http://localhost:8081/addToCart', { book });
      setCart(prevCart => [...prevCart, book]);
      toast.success("Added to Cart Successfully!!", {
        style: {
          minWidth: '5000px', 
          minHeight: '20px' 
        }
      });
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };

  const handleSearch = () => {
    console.log('Search button clicked');
  };

  // Function to handle rating
  const handleRating = async (bookId) => {
    try {
      // Perform action to submit rating to backend
      await axios.post('http://localhost:8081/rateBook', { bookId, rating: selectedRating });
      toast.success(`Rating ${selectedRating} submitted for book ID: ${bookId}`);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  // Function to handle star click event
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const filterBooks = (book) => {
    return (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchQuery.toLowerCase())) &&
           (selectedGenre === '' || book.genre === selectedGenre);
  };

  return (
    <div>
      <Navbar2/>
      <div className="books-container">
        <ToastContainer />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <br></br>
          <br></br>
          <button onClick={handleSearch}>Search</button>
        </div>
        <br></br>
        <div className="filter-container">
          <p>Filter based on genre</p>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{ height: '40px', width: '100px' }}
          >
            <option value="" className='filter'>All Genres</option>
            {books.map(book => (
              <option key={book._id} value={book.genre}>{book.genre}</option>
            ))}
          </select>
        </div>
        
        {books.filter(filterBooks).map((book) => (
          <div key={book._id} className="book-card">
            <div className='imgtag' style={{justifyContent:"center"}} >
              <img className="artimg" src={book.imageUrl} alt="img_here" />
            </div>
            <br></br>
            <p><h3>{book.title}</h3></p>
            <p>Author: {book.author}</p>
            <p>Price: Rs.{book.price}</p>
            <p>Quantity: {book.quantity}</p>
            <p>Genre: {book.genre}</p><br></br>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star}
                  className={star <= selectedRating ? 'star-filled' : 'star-empty'}
                  onClick={() => handleStarClick(star)} // Updated onClick handler
                >
                  &#9733;
                </span>
              ))}
            </div>
            <button onClick={() => handleRating(book._id)}>Rate</button> {/* Rating button */}
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Books;
