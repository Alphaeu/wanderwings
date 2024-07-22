const client = require('../config/redis');

const sendNotification = (userId, message) => {
  client.publish('notifications', JSON.stringify({ userId, message }));
};

module.exports = sendNotification;
