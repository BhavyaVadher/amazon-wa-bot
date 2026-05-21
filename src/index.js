require('dotenv').config();
const express = require('express');
const { initSheet } = require('./sheets');
const webhookRouter = require('./webhook');

const app = express();
app.use(express.json());

app.use('/webhook', webhookRouter);

app.get('/', (req, res) => res.send('Amazon WA Bot running.'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await initSheet();
    console.log('Google Sheet initialized.');
  } catch (err) {
    console.error('Sheet init error:', err.message);
  }
});
