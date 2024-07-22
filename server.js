const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);
app,use('/api/payments', paymentRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
