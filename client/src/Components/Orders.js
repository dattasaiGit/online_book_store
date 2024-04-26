import React, { useState, useEffect } from 'react';
import Navbar3 from './Navbar3';
import axios from 'axios';
import Footer from './Footer';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getorders'); 
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar3 />
      <h2>Orders</h2>
      {orders && orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={index} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total Price:</strong> {order.totalPrice}</p>
              <p><strong>Books:</strong></p>
              <ul>
                {order.books.map((book, idx) => (
                  <li key={idx}>{book.bookname} - {book.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
      <Footer/>
    </div>
  );
};

export default MyOrders;
