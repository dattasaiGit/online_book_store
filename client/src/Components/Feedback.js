import React, { useState } from 'react';
import './Feedback.css';
import Navbar2 from './Navbar2';
import Footer from './Footer'

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedback: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/Feedback', { // Assuming your server is configured to handle '/submit-feedback' route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully!');
        setIsSubmitted(true);
        setFormData({
          feedback: '',
          email: ''
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 6000);
      } else {
        setError('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      setError('An error occurred while submitting feedback.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="feedback-page">
      <Navbar2/>
      <div className='container2'>
      <div className='back'>
        <div className="feedback-container">
          <div className="feedback-form-container">
            <h2>Feedback Form</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <br></br>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Enter your feedback..."
                required
              ></textarea>
              {isSubmitted && <div className="success-message">Feedback submitted successfully!</div>}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <Footer/>
    </div>
  );
};

export default FeedbackForm;