const express = require('express');
const { getFlightStatusByFlightNumber, getFlightStatusByRoute } = require('../controllers/flightStatusController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Route to get flight status by flight number
router.get('/flight/:flightNumber', protect, getFlightStatusByFlightNumber);

// Route to get flight status by route (departure and destination)
router.get('/route', protect, getFlightStatusByRoute);

module.exports = router;
