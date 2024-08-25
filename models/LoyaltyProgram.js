const mongoose = require('mongoose');

const LoyaltyProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pointsPerDollar: {
    type: Number,
    required: true
  },
  maxPoints: {
    type: Number,
    default: 10000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoyaltyProgram', LoyaltyProgramSchema);
