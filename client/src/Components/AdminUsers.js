import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';
import './AdminUser.css'
import Footer from './Footer'

const AdminUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (users === null) {
      axios.get('http://localhost:8081/show').then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    }
  }, [users]);

  function handleDelete(name) {
    axios.delete('http://localhost:8081/delete', {
      params: {
        name: name
      }
    }).then((res) => {
      console.log(res.data);
      setUsers(users.filter(user => user.username !== name));
    }).catch(error => {
      console.error('Error deleting user:', error);
    });
  }

  if (users !== null) {
    return (
      <div>
        <center>
          <Navbar3 />
          <h2>Users Data</h2>
          <table className="custom-table" border={3}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleDelete(user.username)} className='delete'>Delete</button>
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
      <div>Fetching data... please Wait....</div>
    );
  }
};

export default AdminUsers;
