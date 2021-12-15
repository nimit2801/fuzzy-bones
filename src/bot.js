import {Client, Intents} from 'discord.js';
import {
    joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

client.once('ready', async()=> {
    console.log('Ready');
});

function playSong() {
	const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
		inputType: StreamType.Arbitrary,
	});

	player.play(resource);

	return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connecToChannel(channel) {
    const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});

    try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

const player = createAudioPlayer();

client.on('messageCreate', async(msg)=> {
    if(msg.author.bot) return; 
    let voiceChannel = await msg.member.voice.channel
    let connection = await connecToChannel(voiceChannel)
    await playSong()
    connection.subscribe(player)
    msg.reply('Playing now!');
    console.log('some message was sent!')
    
})

process.on('SIGINT', ()=> {
    console.log('pressed ctrl+c')
    client.destroy()
})

client.login(process.env.DJSTOKEN);