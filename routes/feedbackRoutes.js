const express = require('express');
const router = express.Router();

// Import your feedback controller functions
const {
  submitFeedback,
  getFeedback,
  getFeedbackById,
  deleteFeedback,
  updateFeedback
} = require('../controllers/feedbackController');

// Route to submit feedback
router.post('/submit', async (req, res) => {
  try {
    const feedback = await submitFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbackList = await getFeedback();
    res.status(200).json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const feedback = await getFeedbackById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete feedback
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteFeedback(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update feedback
router.put('/:id', async (req, res) => {
  try {
    const feedback = await updateFeedback(req.params.id, req.body);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
