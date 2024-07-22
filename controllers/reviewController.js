const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get reviews for a flight
exports.getReviewsByFlight = async (req, res) => {
  try {
    const reviews = await Review.find({ flightId: req.params.flightId });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
