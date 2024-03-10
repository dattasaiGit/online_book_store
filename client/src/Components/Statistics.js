import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';
import './Statistics.css';

const Statistics = () => {
  const [salesData, setSalesData] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:8081/admin/sales');
        setSalesData(salesResponse.data);

        const booksResponse = await axios.get('http://localhost:8081/admin/popular-books');
        setPopularBooks(booksResponse.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div>
      <Navbar3 />
      <h2>Admin Statistics Page</h2>

      <div>
        <h3>Today's Sales Statistics:</h3>
        <ul>
          {salesData.map((sale) => (
            <li key={sale.orderId}>
              <p>
                orderId: {sale.orderId},<br />
                amount: {sale.amount},<br />
                date: {sale.date},<br />
                customerId: {sale.customerId},<br />
                bookId: {sale.bookId},<br />
                paymentMethod: {sale.paymentMethod},<br />
                shippingAddress: {sale.shippingAddress},<br />
                orderStatus: {sale.orderStatus},<br />
                notes: {sale.notes}<br />
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Most Sold Books:</h3>
        <ul>
          {popularBooks.map((book) => (
            <li key={book.bookId}>
              <p>
                Title: {book.title}, Sales: {book.sales}<br />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
