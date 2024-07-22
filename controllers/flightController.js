const Flight = require('../models/Flight');

exports.createFlight = async (req, res) => {
  const { airline, flightNumber, origin, destination, departureTime, arrivalTime, seatsAvailable, price } = req.body;
  try {
    const flight = new Flight({ airline, flightNumber, origin, destination, departureTime, arrivalTime, seatsAvailable, price });
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.status(200).json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
