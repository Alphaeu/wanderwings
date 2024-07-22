const axios = require('axios');
const qs = require('qs');

const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

const getMpesaToken = async () => {
  const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Mpesa token:', error);
    throw error;
  }
};

module.exports = { getMpesaToken };
