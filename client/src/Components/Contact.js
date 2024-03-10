import React from 'react';
import './contact.css';
import NavBar from './Navbar';

function Contact() {
  return (
    <div>
      <NavBar/>
    <div className='contactfull'>
        <div className='contact-container'>
          <h2>Contact Us</h2>
          <p>If you have any concerns, feel free to reach out to us. We're here to help!</p>
          <form>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' required />

            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' required />

            <label htmlFor='message'>Message:</label>
            <textarea id='message' name='message' rows='4' required></textarea>

            <button className='datta' type='submit'>Send Message</button>
          </form>
        </div>
        </div>
        </div>
  );
}

export default Contact;
