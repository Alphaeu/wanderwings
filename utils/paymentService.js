const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox', // Allow switching between 'sandbox' and 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const createStripePayment = async (amount, currency) => {
  try {
    if (!amount || !currency) throw new Error('Amount and currency are required');

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to the smallest currency unit
      currency,
    });

    return { client_secret: paymentIntent.client_secret, id: paymentIntent.id };
  } catch (error) {
    console.error('Stripe Payment Error:', error.message);
    throw new Error('Failed to create Stripe payment');
  }
};

const createPayPalPayment = async (amount, currency) => {
  try {
    if (!amount || !currency) throw new Error('Amount and currency are required');

    const create_payment_json = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      transactions: [
        {
          amount: { currency, total: amount.toFixed(2) },
          description: 'Payment transaction description.',
        },
      ],
      redirect_urls: {
        return_url: process.env.PAYPAL_RETURN_URL || 'http://localhost:5000/success',
        cancel_url: process.env.PAYPAL_CANCEL_URL || 'http://localhost:5000/cancel',
      },
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          console.error('PayPal Payment Error:', error);
          reject(new Error('Failed to create PayPal payment'));
        } else {
          resolve(payment);
        }
      });
    });
  } catch (error) {
    console.error('PayPal Payment Error:', error.message);
    throw new Error('Failed to create PayPal payment');
  }
};

module.exports = { createStripePayment, createPayPalPayment };