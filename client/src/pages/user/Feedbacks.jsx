

// new one
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth'; // Adjust the path accordingly
import { Heading } from '../../components';
import { Spinner } from 'react-bootstrap'; // For the loading spinner
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import BASE_URL from '../../utils/fetchBaseUrl';


const Feedbacks = () => {
  const { auth } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [editedRating, setEditedRating] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUserFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/v1/feedback/getall-feedback`);
        if (res.data && res.data.success) {
          setFeedbacks(res.data.feedbacks);
        }
        setLoading(false);
      } catch (err) {
        setError("Something went wrong in getting all feedback");
        setLoading(false);
      }
    };
    getAllUserFeedbacks();
  }, []);

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
    setEditedMessage(feedback.message);
    setEditedRating(feedback.rating);
  };

  const handleUpdateFeedback = async (feedbackId) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/feedback/update-feedback/${feedbackId}`, {
        message: editedMessage,
        rating: editedRating,
      });
      setEditingFeedback(null);
      updateFeedbackList(response.data.updatedFeedback);
    } catch (err) {
      setError('Error updating feedback. Please try again.');
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/feedback/delete-feedback/${feedbackId}`);
      setFeedbacks(prevFeedbacks => prevFeedbacks.filter(f => f._id !== feedbackId));
    } catch (err) {
      setError('Error deleting feedback. Please try again.');
    }
  };

  const updateFeedbackList = (updatedFeedback) => {
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(f => (f._id === updatedFeedback._id ? updatedFeedback : f))
    );
  };

  if (!auth.user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        <h3>Please log in to view your feedback.</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Heading name="Your Feedback" />
      {error && <div className="alert alert-danger">{error}</div>}
      
      {feedbacks.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p className="text-muted display-6">No feedback submitted yet.</p>
        </div>
      ) : (
        <div className="row gy-4">
          {feedbacks.map(feedback => (
            <div key={feedback._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card bg-dark text-white shadow-lg border-0">
                <div className="card-body p-4">
                  <h5 className="card-title text-primary">{feedback.user.name}</h5>
                  {editingFeedback && editingFeedback._id === feedback._id ? (
                    <>
                      <textarea
                        className="form-control mb-3"
                        rows="4"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        required
                      />
                      <select
                        className="form-control mb-3"
                        value={editedRating}
                        onChange={(e) => setEditedRating(e.target.value)}
                        required
                      >
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => handleUpdateFeedback(feedback._id)}
                          className="btn btn-primary btn-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingFeedback(null)}
                          className="btn btn-secondary btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="card-text mb-2">{feedback.message}</p>
                      <p className="card-text text-warning">Rating: {feedback.rating}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => handleEditFeedback(feedback)}
                          className="btn btn-outline-light btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFeedback(feedback._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
