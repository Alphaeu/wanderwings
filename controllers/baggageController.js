const Baggage = require('../models/Baggage');

// Track baggage
exports.trackBaggage = async (req, res) => {
  const { baggageId } = req.params;

  try {
    const baggage = await Baggage.findById(baggageId);
    if (!baggage) {
      return res.status(404).json({ msg: 'Baggage not found' });
    }
    res.json(baggage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
