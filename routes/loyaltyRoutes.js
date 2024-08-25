const express = require('express');
const {
  getLoyaltyProgram,
  addLoyaltyPoints,
  redeemLoyaltyPoints,
  getUserLoyaltyStatus
} = require('../controllers/loyaltyController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Route to get details of the loyalty program
router.get('/', protect, getLoyaltyProgram);

// Route to add loyalty points to a user's account
router.post('/add-points', protect, authorize('admin', 'user'), addLoyaltyPoints);

// Route to redeem loyalty points
router.post('/redeem', protect, authorize('admin', 'user'), redeemLoyaltyPoints);

// Route to get a user's loyalty status
router.get('/status/:userId', protect, getUserLoyaltyStatus);

module.exports = router;
