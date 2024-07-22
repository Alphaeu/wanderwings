const express = require('express');
const {
  processStripePayment,
  processPaypalPayment,
  processMpesaPayment,
} = require('../controllers/paymentController');
const router = express.Router();

router.post('/stripe', processStripePayment);
router.post('/paypal', processPaypalPayment);
router.post('/mpesa', processMpesaPayment);

module.exports = router;
