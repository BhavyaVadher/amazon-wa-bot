require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { initSheet } = require('./sheets');
const createWebhook = require('./webhook');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const app = express();
app.use(express.json());
app.use('/webhook', createWebhook(bot));

app.get('/', (req, res) => res.send('Amazon Telegram Bot running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await initSheet();
    console.log('Google Sheet initialized.');
  } catch (err) {
    console.error('Sheet init error:', err.message);
  }
  if (process.env.WEBHOOK_URL) {
    try {
      await bot.setWebHook(`${process.env.WEBHOOK_URL}/webhook`);
      console.log('Telegram webhook set.');
    } catch (err) {
      console.error('Webhook setup error:', err.message);
    }
  }
});
