const Feedback = require('../models/Feedback'); // Import your Feedback model

// Function to submit feedback
const submitFeedback = async (data) => {
  try {
    const feedback = new Feedback(data);
    await feedback.save();
    return feedback;
  } catch (err) {
    throw new Error('Error submitting feedback: ' + err.message);
  }
};

// Function to get all feedback
const getFeedback = async () => {
  try {
    return await Feedback.find();
  } catch (err) {
    throw new Error('Error retrieving feedback: ' + err.message);
  }
};

// Function to get feedback by ID
const getFeedbackById = async (id) => {
  try {
    return await Feedback.findById(id);
  } catch (err) {
    throw new Error('Error retrieving feedback: ' + err.message);
  }
};

// Function to delete feedback
const deleteFeedback = async (id) => {
  try {
    return await Feedback.deleteOne({ _id: id });
  } catch (err) {
    throw new Error('Error deleting feedback: ' + err.message);
  }
};

// Function to update feedback
const updateFeedback = async (id, data) => {
  try {
    return await Feedback.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    throw new Error('Error updating feedback: ' + err.message);
  }
};

module.exports = {
  submitFeedback,
  getFeedback,
  getFeedbackById,
  deleteFeedback,
  updateFeedback
};
