import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [bookQuantities, setBookQuantities] = useState({});
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getcart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

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

  const totalCartPrice = cart.reduce((total, book) => total + calculateTotalPrice(book), 0);

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const giveaddress = () => {
    openAddressModal();
  };

  const handleConfirmAddress = () => {
    console.log('Address:', address);
    closeAddressModal();

  };

  return (
    <div>
      <Navbar2 />
      <h2>Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        <div>
          {cart.map((book, index) => (
            <div key={index} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
              <p><strong>Book Name:</strong> {book.bookname}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> {book.price}</p>
              <p><strong>Quantity:</strong> {bookQuantities[book._id] || 0}</p>
              <p><strong>Total Price:</strong> {calculateTotalPrice(book)}</p>
              <button className='cart-button' onClick={() => increaseQuantity(book._id)}>Increase Quantity</button>&nbsp;&nbsp;&nbsp;
              <button className='cart-button' onClick={() => decreaseQuantity(book._id)}>Decrease Quantity</button>
            </div>
          ))}
          <p><strong>Overall Total Price:</strong> {totalCartPrice}</p>
          <br></br><br></br>
          <button className='payment-button' onClick={giveaddress}>Confirm Your Address</button><br></br><br></br>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {isAddressModalOpen && (
        <div className="address-modal">
          <div className="modal-content">
            <h2>Enter Your Address</h2>
            <label>
              Address:
              <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} /><br></br>
            </label><br></br>
            <button className='address' onClick={handleConfirmAddress}>Confirm</button>
            <button className='address' onClick={closeAddressModal}>Close</button>
            <br></br><br></br>
            <button className='payment-button'>Proceed to Payment</button>
            <br></br><br></br><br></br>        
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
