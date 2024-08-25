//../routes/additionalServicesRoutes.js
const express = require('express');
const router = express.Router();
const { getAdditionalServices } = require('../controllers/additionalServicesController');

// Route to get additional services
router.get('/', getAdditionalServices);

module.exports = router;
