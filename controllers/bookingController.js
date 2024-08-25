// ../controllers/bookingController.js
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { flightId, userId, seatNumber } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ msg: 'Flight not found' });
    }

    const booking = new Booking({ flightId, userId, seatNumber });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a booking by its ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('flightId');
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all bookings for a specific user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('flightId');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing booking
exports.updateBooking = async (req, res) => {
  try {
    const { seatNumber } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.seatNumber = seatNumber || booking.seatNumber;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndRemove(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.json({ msg: 'Booking cancelled' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
