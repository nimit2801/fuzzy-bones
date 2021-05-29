'use strict';
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', async () => {
  console.log('ready');
});
const PREFIX = '!';

// Create an event listener for messages
client.on('message', (message) => {
  // If the message is "what is my avatar"
  if (message.content.startsWith('!ava')) {
    let mentioned = message.mentions.members;
    if (mentioned) {
      console.log(mentioned.first().user.displayAvatarURL());
      return message.reply(mentioned.first().user.displayAvatarURL());
    }
    message.reply(message.author.displayAvatarURL());
  }
});
// const embed = new Discord.MessageEmbed()
//   .setTitle('Some Title')
//   .setColor('#0099ff');

// client.once('ready', async () => {
//   try {
//     const channel = client.channels.get('803215470345191454');
//     const webhooks = await channel.fetchWebhooks();
//     const webhook = webhooks.first();

//     await webhook.send('Webhook test', {
//       username: 'some-username',
//       avatarURL: 'https://i.imgur.com/wSTFkRM.png',
//       embeds: [embed],
//     });
//   } catch (error) {
//     console.error('Error trying to send: ', error);
//   }
// });
// const hook = new Discord.Webhook(
//   '841885814593814558',
//   '1c2rWoXkrrQsJMRnKCHTmddHecz5zI5bel90O0lS7u6DgqoIoTAmu6zCd-IWFtkzucPi'
// );

// hook.send('I am now alive!');

// https://discord.com/api/webhooks/841881205326348341/_7i4soxb5Y6AAWyHVCHBAaPIK9bMKaTbXASTTZSVLb7RA3NE8k-aQWsLTtZfs8kbNtK1
// https://discord.com/api/webhooks/841885814593814558/

client.login(process.env.DJSTOKEN);
