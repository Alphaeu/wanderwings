const Ticket = require('../models/Ticket');

// Create a new support ticket
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, userId } = req.body;

    const ticket = new Ticket({
      subject,
      description,
      userId,
      status: 'open'
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a support ticket by its ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all tickets for a specific user
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing support ticket
exports.updateTicket = async (req, res) => {
  try {
    const { subject, description, status } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    ticket.subject = subject || ticket.subject;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a support ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndRemove(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    res.json({ msg: 'Ticket deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
