import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';
import './AddBooks.css';

const AddBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [genre, setGenre] = useState(''); 

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/getBooks');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    try {
      await axios.post('http://localhost:8081/addbooks', { title, author, price, genre, quantity });
      fetchBooks();
      setTitle('');
      setAuthor('');
      setPrice('');
      setGenre('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <Navbar3 />
      <div className="container">
        <div className="add-book-form">
          <h2>Add a Book (Admin)</h2>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />

          <label>Quantity:</label>
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <button onClick={addBook}>Add Book</button>
        </div>

        <div className="available-books">
          <h2>Available Books</h2>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                {book.title} by {book.author} - ${book.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
