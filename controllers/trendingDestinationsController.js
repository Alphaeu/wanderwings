const TrendingDestination = require('../models/TrendingDestination');

// Get all trending destinations
exports.getTrendingDestinations = async (req, res) => {
  try {
    const destinations = await TrendingDestination.find();
    res.json(destinations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new trending destination
exports.addTrendingDestination = async (req, res) => {
  try {
    const { name, location, popularityScore } = req.body;

    const newDestination = new TrendingDestination({
      name,
      location,
      popularityScore
    });

    const destination = await newDestination.save();
    res.status(201).json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing trending destination
exports.updateTrendingDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, popularityScore } = req.body;

    const updatedDestination = await TrendingDestination.findByIdAndUpdate(
      id,
      { name, location, popularityScore },
      { new: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }

    res.json(updatedDestination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a trending destination
exports.deleteTrendingDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await TrendingDestination.findByIdAndRemove(id);

    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }

    res.json({ msg: 'Destination deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
