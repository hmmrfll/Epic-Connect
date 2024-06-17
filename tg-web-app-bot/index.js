const token = "7003178990:AAFR6xDRDb0AojAVjRFQbJLxgnOet2Ic7d8";
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});
const webAppUrl = "https://ya.ru";

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start"){
        await bot.sendMessage(chatId, 'Ready to run Epic Connect?', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'GO', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});