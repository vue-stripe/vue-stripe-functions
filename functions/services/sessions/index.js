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
    success_url: req.body.success_url,
    cancel_url: req.body.cancel_url,
    payment_method_types: req.body.payment_method_types,
    line_items: req.body.line_items,
    mode: req.body.mode,
    client_reference_id: req.body.client_reference_id,
    customer: req.body.customer,
    customer_email: req.body.customer_email,
    metadata: req.body.metadata,
  };
  const session = await stripe.checkout.sessions.create(payload);
  res.send(session);
});

module.exports = functions.https.onRequest(app);
