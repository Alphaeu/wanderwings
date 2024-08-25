const mongoose = require('mongoose');

// Ensure the .env file is loaded
require('dotenv').config();

const connectDB = async () => {
    try {
        // Check if MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex is deprecated in newer versions of mongoose
            // useFindAndModify is also deprecated, not needed in recent mongoose versions
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  // Exit the process with a failure code
    }
};

module.exports = connectDB;
