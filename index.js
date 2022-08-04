require("dotenv").config();

const axios = require("axios");
const Discord = require("discord.js");
const bot = new Discord.Client();

bot.login();

bot.on("ready", () => {
    console.log(`Client is logged in as ${bot.user.tag} and ready!`);
});

bot.on("message", async (message) => {
    const { content } = message;
    
    if (content.startsWith("!baixa")) {
        const videoUrl = content.split(" ")[1];
        message.reply("só um minutinho meu querido, vou baixar pra você");

        try {
            const { data } = await axios.post(
                process.env.DOWNLOAD_API_URL,
                { url: videoUrl }
            );
            const { url } = data;

            message.reply(`aqui o link pro download meu jovem: ${url}`);
        } catch (error) {
            message.reply("não consegui baixar teu vídeo :(");
        }
    }
});
