// config/allowedOrigins.js

// To load our environment variables
require('dotenv').config();

const devOrigins = [
  'http://localhost:3000', // Localhost for frontend development
  'http://localhost:8080', // Localhost for API development/testing
];

const prodOrigins = [
  'https://wanderwings.netlify.app', // Production frontend
  'https://api.wanderwings.com', // Production API
];

// Determine the environment
const isProduction = process.env.NODE_ENV === 'production';

// Set allowed origins based on the environment
const allowedOrigins = isProduction ? prodOrigins : devOrigins;

// Additional dynamic origins go here
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
}

module.exports = allowedOrigins;
