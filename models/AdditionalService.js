const mongoose = require('mongoose');

// Definition of the schema for additional services
const AdditionalServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price must be a positive number']
  },
  available: {
    type: Boolean,
    default: true
  }
});

// Create and export the model
module.exports = mongoose.model('AdditionalService', AdditionalServiceSchema);
