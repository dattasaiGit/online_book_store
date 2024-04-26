import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';
import './AdminUser.css'
import Footer from './Footer'

const AdminBooks = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (books === null) {
      axios.get('http://localhost:8081/getbooks')
        .then((res) => {
          console.log(res.data);
          setBooks(res.data);
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  }, [books]);

  function handleDelete(name) {
    axios.delete('http://localhost:8081/deletebook', {
      params: {
        name: name
      }
    }).then((res) => {
      console.log(res.data);
      setBooks(books.filter(book => book.title !== name));
    }).catch(error => {
      console.error('Error deleting book:', error);
    });
  }

  if (books !== null) {
    return (
      <div>
        <center>
          <Navbar3 />
          <h2>Books Data</h2>
          <table className="custom-table" border={3}>
            <thead>
              <tr>
                <th>Book name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Quantity</th> 
                <th>Price</th> 
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.quantity}</td> 
                  <td>{book.price}</td> 
                  <td>
                    <button onClick={() => handleDelete(book.title)} className='delete'>Delete</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
        <Footer/>
      </div>
    );
  } else {
    return (
      <div>Fetching data... please wait....</div>
    );
  }
};

export default AdminBooks; 
