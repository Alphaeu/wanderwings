const express = require('express');
const {
  getTrendingDestinations,
  addTrendingDestination,
  updateTrendingDestination,
  deleteTrendingDestination
} = require('../controllers/trendingDestinationsController');

const router = express.Router();

// Route to get all trending destinations
router.get('/', getTrendingDestinations);

// Route to add a new trending destination
router.post('/', addTrendingDestination);

// Route to update an existing trending destination
router.put('/:id', updateTrendingDestination);

// Route to delete a trending destination
router.delete('/:id', deleteTrendingDestination);

module.exports = router;
