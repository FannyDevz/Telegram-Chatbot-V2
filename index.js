require('dotenv').config();
const {_ai} = require("lowline.ai");


const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const options = {
    polling: true
}
const bot = new TelegramBot(token , options);

console.log('Bot is running...');

const prefix = '!';
const ai = new RegExp(`^${prefix}ai`);
const gempa = new RegExp(`^${prefix}gempa$`);


bot.onText(ai, async (msg) => {
    const id = msg.chat.id
    const message = msg.text
    const regex = /^!ai (.+)/;
    const match = message.match(regex);
    const value = match ? match[1] : null;

    console.log(value)
    if (!value) {
        return bot.sendMessage(id, "Masukkan prompt yang ingin di generate");
    } else{
        bot.sendMessage(id, "Tunggu Sebentar...");
        try {
            const res = await _ai.generatePlaintext({
            prompt: value,
            });
            if (res.error) {
                console.log(res.error);
                bot.sendMessage(id, res.error);
            } else {
                console.log(res.result);
                bot.sendMessage(id, res.result);
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(id, error);
        }
    }
})

bot.onText(gempa, async (msg) => {
    const id = msg.chat.id
    const BMKG_API = "https://data.bmkg.go.id/DataMKG/TEWS/"
    const apiCall = await fetch(BMKG_API + "autogempa.json")
    const {
        Infogempa : {
            gempa : {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }
        }
    } = await apiCall.json()

    const BMKGImage = BMKG_API + Shakemap

const resultText = `
Jam : ${Jam}
Magnitude : ${Magnitude}
Tanggal : ${Tanggal}
Wilayah : ${Wilayah}
Potensi : ${Potensi}
Kedalaman : ${Kedalaman}
`
bot.sendPhoto(id, BMKGImage, { caption: resultText });
})

// bot.on("message", (msg) => {
//     const id = msg.chat.id
//     console.log(msg.text)
//     // bot.sendMessage(id, msg.text);
// })