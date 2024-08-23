// routes/airportRoutes.js
const express = require('express');
const { getAirportInfo } = require('../services/airportService');

const router = express.Router();

router.get('/:airportCode', async (req, res) => {
    const { airportCode } = req.params;
    try {
        const airportInfo = await getAirportInfo(airportCode);
        res.json(airportInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching airport information' });
    }
});

module.exports = router;