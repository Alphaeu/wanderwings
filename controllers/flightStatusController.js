const Flight = require('../models/Flight');

// Get flight status by flight number
exports.getFlightStatusByFlightNumber = async (req, res) => {
    try {
        const flightNumber = req.params.flightNumber;
        const flight = await Flight.findOne({ flightNumber });

        if (!flight) {
            return res.status(404).json({ msg: 'Flight not found' });
        }

        res.json({
            flightNumber: flight.flightNumber,
            status: flight.status,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            departureAirport: flight.departureAirport,
            arrivalAirport: flight.arrivalAirport
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get flight status by route (departure and destination)
exports.getFlightStatusByRoute = async (req, res) => {
    try {
        const { departureAirport, arrivalAirport } = req.query;
        const flights = await Flight.find({ departureAirport, arrivalAirport });

        if (flights.length === 0) {
            return res.status(404).json({ msg: 'No flights found for this route' });
        }

        res.json(flights.map(flight => ({
            flightNumber: flight.flightNumber,
            status: flight.status,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            departureAirport: flight.departureAirport,
            arrivalAirport: flight.arrivalAirport
        })));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
