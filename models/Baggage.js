const mongoose = require('mongoose');

const BaggageSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  baggageId: { type: String, required: true, unique: true },
  status: { type: String, default: 'checked-in' },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Baggage', BaggageSchema);
