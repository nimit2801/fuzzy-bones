const discord = require('discord.js');
const bot = new discord.Client();
const levels = require('discord-xp');
bot.giveaways = Creator;

level.setURL("");

bot.login('');

bot.on("ready", bot => {
    console.log('Bot is online');
})

bot.on("message", async message => {
    if(!message.guild) return;
    if(message.author.bot) return;
    const prefix = "?";

    const args = message.content.slice(prefix.lenght).trim().split(/ +g/);
    const command = args.shift().toLocaleLowerCase();

    const randomXp = Math.floor(math.random() * 9) + 1;
    const hasLevelUp = await levels.fetch(message.author.id, message.guild.id);  
    if(hasLevelUp){
        const user = await levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up too ${user.level}! Keep it going`);
    }
    if(command === "rank"){
        const user = await levels.fetch(message.author.id, message.guild.id);
        messaage.channel.send(`You are currently on level **${user.level}**!`);
    }

    if(command === "lb"){
        const rawLeaderboard = await levels.fetchLeaderboard(message.guild.id, 5);
        if(rawLeaderboard.length < 1) return ("Nobody is in the leaderboard!")
        
        const leaderboard = levels.computeLeaderboard(bot, rawLeaderboard);

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\n#${e.level}\nXP: ${e.xp.toLowerString()}`);
        message.channel.send(`${lb.join("\n\n")}`);
    }
})