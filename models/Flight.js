const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', FlightSchema);
