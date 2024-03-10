import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';
import Navbar2 from './Navbar2';
import Cart from './Cart'; 

const Books = () => {
  const [, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
 


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
      
      setCart([...cart, book]);
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };
  
  const books = [
    {"source":"./image1.jpg","bookname":"Harry Potter","author":"J.K Rowling","price":899, "genre": "Fantasy", "quantity": 10},
    {"source":"./image2.jpg","bookname":"Ek Samandar, Mere Andar","author":"Sanjeev Joshi","price":499, "genre": "Drama", "quantity": 15},
    {"source":"./image3.jpg","bookname":"Come! Let's Run","author":"Ma. Subramanian","price":799, "genre": "Adventure", "quantity": 8},
    {"source":"./image4.jpg","bookname":"Spare","author":"J. R. Moehringer","price":699, "genre": "Biography", "quantity": 20},
    {"source":"./image6.jpg","bookname":"An Acceptable Time","author":"Madeleine L'Engle","price":559, "genre": "Poetry", "quantity": 12},
    {"source":"./image5.jpg","bookname":"Nation Calling","author":"Dr MA Hasan","price":499, "genre": "Historical Fiction", "quantity": 18},
    {"source":"./image7.png","bookname":"Agatha Chirstie","author":"Narayanan Vaghul","price":759, "genre": "Philosophy", "quantity": 25},
    {"source":"./image8.jpg","bookname":"Memories Never Die","author":"Dr. Y.S. Rajan","price":829, "genre": "Autobiography", "quantity": 15},
  ];
  
  return (
    <div>
    <Navbar2/>
    <div className="books-container">
    <div className="books-container">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <div className='imgtag' style={{justifyContent:"center"}} ><img className="artimg" src={book.source} alt='img_here'/></div>
            <br></br><p>{book.bookname}</p>
            <p>Author: {book.author}</p>
            <p>Price: Rs.{book.price}</p>
            <p>Quantity: {book.quantity}</p>
            <p>Genre: {book.genre}</p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </div>
            ) )
          }
        </div>
    </div>
    </div>
  )
};

export default Books;
