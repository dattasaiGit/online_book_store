import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admin/orders');
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
      <h2>Admin Orders Page</h2>
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
    </div>
  );
};

export default Orders;
