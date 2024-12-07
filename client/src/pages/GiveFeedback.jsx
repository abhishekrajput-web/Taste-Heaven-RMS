import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth'; 
import {toast} from "react-hot-toast";
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/fetchBaseUrl';

const GiveFeedback = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      return alert('Please log in to submit feedback.');
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/feedback/create-feedback`, {
        message,
        rating,
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        console.error(err);
        setError('Error submitting feedback. Please try again.');
      }
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-primary mb-4">Thank You for Your Feedback!</h2>
          <p className="mb-4">Your feedback has been submitted successfully.</p>
          <Link to="/" className="btn btn-primary btn-lg">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="bg-white p-5 rounded-lg shadow-lg w-100 max-w-400" onSubmit={handleSubmit}>
        <h2 className="text-center text-primary mb-4">Submit Feedback</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="form-group mb-4">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="rating" className="form-label">Rating</label>
          <select
            id="rating"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default GiveFeedback;
