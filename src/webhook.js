const express = require('express');
const { handleMessage } = require('./bot');

module.exports = function(bot) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    res.sendStatus(200);
    try {
      const update = req.body;
      if (!update.message?.text) return;

      const chatId = String(update.message.chat.id);
      const text = update.message.text;

      const reply = await handleMessage(chatId, text);
      await bot.sendMessage(chatId, reply);
    } catch (err) {
      console.error('Webhook error:', err.message);
    }
  });

  return router;
};
