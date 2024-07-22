const SupportTicket = require('../models/SupportTicket');

// Create a support ticket
exports.createSupportTicket = async (req, res) => {
  try {
    const supportTicket = new SupportTicket(req.body);
    await supportTicket.save();
    res.status(201).json(supportTicket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all support tickets
exports.getAllSupportTickets = async (req, res) => {
  try {
    const supportTickets = await SupportTicket.find();
    res.json(supportTickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get support ticket by ID
exports.getSupportTicketById = async (req, res) => {
  try {
    const supportTicket = await SupportTicket.findById(req.params.id);
    if (!supportTicket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.json(supportTicket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a support ticket
exports.updateSupportTicket = async (req, res) => {
  try {
    const supportTicket = await SupportTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supportTicket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.json(supportTicket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a support ticket
exports.deleteSupportTicket = async (req, res) => {
  try {
    const supportTicket = await SupportTicket.findByIdAndRemove(req.params.id);
    if (!supportTicket) {
      return res.status(404).json({ msg: 'Support ticket not found' });
    }
    res.json({ msg: 'Support ticket deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
