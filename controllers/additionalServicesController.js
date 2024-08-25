const AdditionalService = require('../models/AdditionalService');

// Get all additional services
exports.getAdditionalServices = async (req, res) => {
  try {
    const services = await AdditionalService.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
