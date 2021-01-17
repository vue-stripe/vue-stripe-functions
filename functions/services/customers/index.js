const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const SK = functions.config().stripe.sk;
const BASE_URL = 'https://api.stripe.com';

const app = express();
const stripe = Stripe(SK);
app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
  const list = await stripe.customers.list();
  res.send(list);
});

module.exports = functions.https.onRequest(app);
