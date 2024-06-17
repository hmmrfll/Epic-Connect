const token = "7343786039:AAGyaAfLxYUvH-xKO6rfRf-qFdE6zT4hTO0";

const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./models/user');

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = "https://your-web-app-url.com";
const communityAppUrl = "https://t.me/pisarevich";

mongoose.connect('mongodb://localhost:27017/EpicConnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text.startsWith("/start")) {
        const refCodeMatch = text.match(/\/start (.+)/);
        const referrerReferralCode = refCodeMatch ? refCodeMatch[1].replace('ref_', '') : null;

        let user = await User.findOne({ chatId: chatId });

        if (!user) {
            const referralCode = generateReferralCode();
            console.log(`Referral link user ${chatId} (): https://t.me/EpicConnectFatherBot?start=ref_${referralCode}`);

            const newUser = new User({
                chatId: chatId,
                referralCode: referralCode,
                referrerChatId: null
            });

            if (referrerReferralCode) {
                const referrer = await User.findOne({ referralCode: referrerReferralCode });
                if (referrer) {
                    newUser.referrerChatId = referrer.chatId;
                    await bot.sendMessage(referrer.chatId, `Finally! @${msg.from.username} joined your Web3 hub on EPIC!`);
                }
            }

            user = await newUser.save();
        }

        user = await User.findOne({ chatId: chatId });

        const referralLink = `https://t.me/EpicConnectFatherBot?start=ref_${user.referralCode}`;

        let username = msg.from.username ? `@${msg.from.username}` : '';

        await bot.sendMessage(chatId, `Hey ${username}! It's Epic Connect! 🌟 Your go-to app for connecting with Web3 builders, investors, and professionals!📱`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Launch Epic Connect', url: webAppUrl }],
                    [{ text: 'Join community', url: communityAppUrl }]
                ]
            }
        });
    }
});

function generateReferralCode() {
    return crypto.randomBytes(4).toString('hex');
}
