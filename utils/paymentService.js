const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET,
});

const createStripePayment = async (amount, currency) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  return paymentIntent.client_secret;
};

const createPayPalPayment = async (amount, currency) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [{
      amount: {
        currency,
        total: amount.toString(),
      },
      description: 'This is the payment transaction description.',
    }],
    redirect_urls: {
      return_url: 'http://return.url',
      cancel_url: 'http://cancel.url',
    },
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

module.exports = { createStripePayment, createPayPalPayment };
