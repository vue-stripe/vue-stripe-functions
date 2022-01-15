const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const SK = functions.config().stripe.sk;
const BASE_URL = 'https://api.stripe.com';

const app = express();
const stripe = Stripe(SK);
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/', async (req, res) => {
  const payload = {
    amount: req.body.amount || 2000,
    currency: req.body.currency || 'usd',
    payment_method_types: [
      'alipay',
      'card',
      'klarna',
    ]
  };
  const paymentIntents = await stripe.paymentIntents.create(payload);
  res.send(paymentIntents);
});

module.exports = functions.https.onRequest(app);
