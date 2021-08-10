require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});

client.on('ready', () => {
  const servers = client.guilds.cache.size;
  const users = client.users.cache.size;

  console.log(
    `Bot is now online and serving in ${servers} Server and ${users} users`
  );

  client.user.setActivity(`with unicorns!`, {
    type: 'PLAYING',
  });
});

function fun(connection) {}

client.on('message', async (message) => {
  // Join the same voice channel of the author of the message
  if (message.content === 'asd') {
    try {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play('audio.mp3');

      dispatcher.on('start', () => {
        console.log('audio.mp3 is now playing!');
      });

      dispatcher.on('finish', () => {
        console.log('audio.mp3 has finished playing!');
      });
    } catch (error) {
      console.log(error);
      dispatcher.on('error', console.error);
    }
  }
  if (message.content === 'dis') {
    voiceChannel.leave();
  }
});

client.login(process.env.DJSTOKEN);
