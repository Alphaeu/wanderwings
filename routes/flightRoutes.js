const express = require('express');
const { createFlight, getFlights, getFlight, updateFlight, deleteFlight } = require('../controllers/flightController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createFlight);
router.get('/', getFlights);
router.get('/:id', getFlight);
router.put('/:id', authMiddleware, updateFlight);
router.delete('/:id', authMiddleware, deleteFlight);

module.exports = router;
