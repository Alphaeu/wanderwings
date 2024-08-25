const LoyaltyProgram = require('../models/LoyaltyProgram');
const User = require('../models/User');

// Get details of the loyalty program
exports.getLoyaltyProgram = async (req, res) => {
  try {
    const program = await LoyaltyProgram.findOne();
    if (!program) {
      return res.status(404).json({ msg: 'Loyalty program not found' });
    }
    res.json(program);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add loyalty points to a user's account
exports.addLoyaltyPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    // Validate input
    if (!userId || !points || points <= 0) {
      return res.status(400).json({ msg: 'Invalid input' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.loyaltyPoints += points;
    await user.save();
    res.json({ msg: 'Loyalty points added', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Redeem loyalty points from a user's account
exports.redeemLoyaltyPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    // Validate input
    if (!userId || !points || points <= 0) {
      return res.status(400).json({ msg: 'Invalid input' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.loyaltyPoints < points) {
      return res.status(400).json({ msg: 'Insufficient points' });
    }

    user.loyaltyPoints -= points;
    await user.save();
    res.json({ msg: 'Loyalty points redeemed', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a user's loyalty status
exports.getUserLoyaltyStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      userId: user._id,
      loyaltyPoints: user.loyaltyPoints
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
