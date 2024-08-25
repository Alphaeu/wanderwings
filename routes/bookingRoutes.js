const express = require('express');
const { 
    createBooking, 
    getBookingById, 
    getUserBookings, 
    updateBooking, 
    cancelBooking 
} = require('../controllers/bookingController'); 
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Route to create a new booking
router.post('/', protect, createBooking);

// Route to get a booking by its ID
router.get('/:id', protect, getBookingById);

// Route to get all bookings for a specific user
router.get('/user/:userId', protect, getUserBookings);

// Route to update an existing booking
router.put('/:id', protect, authorize('admin', 'user'), updateBooking);

// Route to cancel a booking
router.delete('/:id', protect, authorize('admin', 'user'), cancelBooking);

module.exports = router;

