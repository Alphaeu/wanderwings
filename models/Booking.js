const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, default: 'booked' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
