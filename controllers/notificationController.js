const Notification = require('../models/Notification');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndRemove(req.params.id);
    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }
    res.json({ msg: 'Notification deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
