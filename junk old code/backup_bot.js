const Discord = require('Discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('Logged in :D');
});

bot.on('message', (message) => {
  console.log(ping.execute(message, args));
});
const ping = require('./commands/ping.js');
console.log();
bot.login(process.env.DJSTOKEN);
