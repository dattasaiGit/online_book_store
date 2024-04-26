import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [bookQuantities, setBookQuantities] = useState({});
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getcart');
        setCart(response.data);
        const totalPrice = response.data.reduce((total, book) => {
          const quantity = bookQuantities[book._id] || 0;
          return total + (book.price * quantity);
        }, 0);
        setTotalCartPrice(totalPrice);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [bookQuantities]);

  const increaseQuantity = (bookId) => {
    setBookQuantities((prevQuantities) => ({
      ...prevQuantities,
      [bookId]: (prevQuantities[bookId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (bookId) => {
    if (bookQuantities[bookId] && bookQuantities[bookId] > 0) {
      setBookQuantities((prevQuantities) => ({
        ...prevQuantities,
        [bookId]: prevQuantities[bookId] - 1,
      }));
    }
  };

  const calculateTotalPrice = (book) => {
    const quantity = bookQuantities[book._id] || 0;
    return book.price * quantity;
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8081/removeFromCart/${itemId}`);
      const updatedCart = cart.filter(item => item._id !== itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <h2>Cart</h2>
      <div className='container'>
        {cart.map((book, index) => (
          <div key={index} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
            <p><strong>Book Name:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> {book.price}</p>
            <p><strong>Quantity:</strong> {bookQuantities[book._id] || 0}</p>
            <p><strong>Total Price:</strong> {calculateTotalPrice(book)}</p>
            <button className='cart-button' onClick={() => increaseQuantity(book._id)}><h1>+</h1></button>&nbsp;&nbsp;&nbsp;
            <button className='cart-button' onClick={() => decreaseQuantity(book._id)}><h1>-</h1></button>
          </div>
        ))}
        <p><strong>Overall Total Price:</strong> {totalCartPrice}</p>
        <br></br><br></br>
        <button>
          <Link
            to={{ pathname: '/address', state: { totalCartPrice } }} 
          >
            Confirm Your Address
          </Link>
        </button><br></br><br></br>
      </div>
    </div>
  );
};

export default Cart;
