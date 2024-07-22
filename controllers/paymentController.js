const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
const axios = require('axios');
const moment = require('moment');
const base64 = require('base-64');

paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Stripe Payment Processing
exports.processStripePayment = async (req, res) => {
  const { amount, currency, source, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      source,
      description,
    });

    res.json(paymentIntent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// PayPal Payment Processing
exports.processPaypalPayment = async (req, res) => {
  const { amount, currency } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    redirect_urls: {
      return_url: 'http://return.url',
      cancel_url: 'http://cancel.url',
    },
    transactions: [{
      amount: { currency, total: amount },
      description: 'Payment description',
    }],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(400).json({ message: error.response });
    } else {
      res.status(201).json({ payment });
    }
  });
};

// Mpesa Token Generation
const generateMpesaToken = async () => {
  const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;
  const auth = 'Basic ' + base64.encode(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);

  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: auth } }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error generating Mpesa token:', error);
    throw error;
  }
};

// Mpesa Payment Processing
exports.processMpesaPayment = async (req, res) => {
  const { amount, phoneNumber } = req.body;
  const { MPESA_SHORTCODE, MPESA_PASSKEY } = process.env;

  try {
    const token = await generateMpesaToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = base64.encode(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`);

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://your.callback.url/path',
        AccountReference: 'EasyTravel',
        TransactionDesc: 'Payment for travel services',
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (response.data.ResponseCode === '0') {
      res.status(201).json({ message: 'Payment initiated successfully', response: response.data });
    } else {
      res.status(400).json({ message: 'Payment initiation failed', response: response.data });
    }
  } catch (error) {
    console.error('Error processing Mpesa payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { processStripePayment, processPaypalPayment, processMpesaPayment };


