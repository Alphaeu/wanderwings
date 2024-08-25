const express = require('express');
const { createTicket, getTicketById, getUserTickets, updateTicket, deleteTicket } = require('../controllers/customerSupportController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Route to create a new support ticket
router.post('/', protect, createTicket);

// Route to get a support ticket by its ID
router.get('/:id', protect, getTicketById);

// Route to get all tickets for a specific user
router.get('/user/:userId', protect, getUserTickets);

// Route to update an existing support ticket
router.put('/:id', protect, authorize('admin', 'user'), updateTicket);

// Route to delete a support ticket
router.delete('/:id', protect, authorize('admin', 'user'), deleteTicket);

module.exports = router;
