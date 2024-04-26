import React from 'react';
import './About.css';
import NavBar from './Navbar';

function About() {
  return (
    <div>
      <NavBar/>
    <div className='full'>
      <div className='about-container'>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
        </style>
        <h2 className='lato-regular'><b>About Us</b></h2>
        <div className='text-container'>
          <center><h2><u>The Ocean of Pages</u></h2></center>
          <p className='lato-regular'>
           Welcome to Our Book Store!<br></br>

<b>Our Mission:</b><br></br> At our Bookstore, we believe that every book has a story waiting to be told. Our mission is to connect readers with the books that will inspire, entertain, and enlighten them.<br></br>

<b>Our Story:</b><br></br> It all started with a dream and a love for books. Our Bookstore was born from a passion to share the joy of reading with everyone. From humble beginnings to a thriving online community, our journey has been fueled by the stories that move us.<br></br>

<b>Our Values:</b><br></br> 
We are committed to:<br></br>
- Diversity: Celebrating stories from all walks of life.<br></br>
- Accessibility: Making reading available to everyone, everywhere.<br></br>
      </p>
    </div>
    </div>
    </div>
    </div>
  );
}

export default About;
