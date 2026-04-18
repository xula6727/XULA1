npm install discord.js @discordjs/voice play-dl libsodium-ffmpeg
:white_check_mark:
Click to react
:heart:
Click to react
:fire:
Click to react
Add Reaction
Edit
Forward
More
[12:46 AM]Sunday, April 19, 2026 12:46 AM
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const play = require('play-dl');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!play')) {
        const args = message.content.split(' ');
        const url = args[1];

        if (!message.member.voice.channel) return message.reply('لازم تدخل روم صوتي أولاً!');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        let stream = await play.stream(url);
        let resource = createAudioResource(stream.stream, { inputType: stream.type });
        let player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        message.reply(جاري تشغيل: ${url});
    }
});

client.login(process.env.TOKEN);
