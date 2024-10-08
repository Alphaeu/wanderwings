const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // New
const bookingRoutes = require('./routes/bookingRoutes'); // New
const flightStatusRoutes = require('./routes/flightStatusRoutes'); // New
const additionalServicesRoutes = require('./routes/additionalServicesRoutes'); // New
const loyaltyRoutes = require('./routes/loyaltyRoutes'); // New
const customerSupportRoutes = require('./routes/customerSupportRoutes'); // New
const trendingDestinationsRoutes = require('./routes/trendingDestinationsRoutes'); // New
const { corsOptions } = require('./config/corsOptions');

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line for debugging

const app = express();

// Apply CORS middleware
app.use(cors(corsOptions));  // Ensure `corsOptions` is correctly defined in './config/corsOptions'

// Connect to Database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/feedback', feedbackRoutes); // New
app.use('/api/booking', bookingRoutes); // New
app.use('/api/flight-status', flightStatusRoutes); // New
app.use('/api/additional-services', additionalServicesRoutes); // New
app.use('/api/loyalty', loyaltyRoutes); // New
app.use('/api/customer-support', customerSupportRoutes); // New
app.use('/api/trending-destinations', trendingDestinationsRoutes); // New

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


