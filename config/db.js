const mongoose = require('mongoose');
require('dotenv').config();
const chalk = require('chalk'); // Optional for better logging

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.green.bold(`MongoDB Connected: ${conn.connection.host}`));

        // Event listeners for better debugging
        mongoose.connection.on('error', (err) => {
            console.error(chalk.red.bold(`MongoDB Connection Error: ${err.message}`));
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(chalk.yellow.bold('MongoDB Disconnected.'));
        });

    } catch (error) {
        console.error(chalk.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

module.exports = connectDB;