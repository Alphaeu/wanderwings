const axios = require('axios');
const redis = require('redis');

const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' });
client.connect().catch(console.error);

const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const mpesaEnv = process.env.MPESA_ENV || 'sandbox'; // 'sandbox' or 'production'

const BASE_URL =
  mpesaEnv === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

const getMpesaToken = async () => {
    if (!consumerKey || !consumerSecret) {
        throw new Error('Mpesa Consumer Key and Consumer Secret are required');
    }

    try {
        // Check if token is in Redis
        const cachedToken = await client.get('mpesa_token');
        if (cachedToken) {
            console.log('Using cached Mpesa token');
            return cachedToken;
        }

        // If no cached token, request a new one
        const url = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

        const response = await axios.get(url, {
            headers: { Authorization: `Basic ${auth}` },
        });

        if (response.data && response.data.access_token) {
            const token = response.data.access_token;

            // Cache token in Redis with expiry (3600 seconds = 1 hour)
            await client.setEx('mpesa_token', 3600, token);
            console.log('New Mpesa token cached');

            return token;
        } else {
            throw new Error('Invalid response from Mpesa API');
        }
    } catch (error) {
        console.error('Error getting Mpesa token:', error.response?.data || error.message);
        throw new Error('Failed to retrieve Mpesa access token');
    }
};

module.exports = { getMpesaToken };