require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');

const webhookclient = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
//const gmm = new GuildMemberManager(client);
const PREFIX = "!";
client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`);
})

client.on('ready', () => {
    //This will get the amount of servers and then return it.
    const servers = client.guilds.cache.size
    const users = client.users.cache.size
    
    console.log(`Bot is now online and serving in ${servers} Server and ${users} users`)
    //This will display "Playing in <servers> servers!"
    client.user.setActivity(`in ${servers} servers and serving ${users} Users`, {
        type: 'PLAYING',
    });
    // client.guilds.members.fetchAllmembers()
    // .then(console.log)
    // .catch(console.error);
})

client.on('message', async (message) => {
    if(message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
        //console.log(CMD_NAME);
        if(CMD_NAME === 'kick'){
            if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to use that command!');
            if(args.length === 0) return message.reply('Please provide an user. ');
            const member = message.guild.members.cache.get(args[0]);
            if(member){
                member.kick()
                .then((member) => {
                    message.channel.send(`Kicked the user ${member}`)
                })
                .catch((err) => {
                    message.channel.send('I cannot kick that user :(')
                });    
            } else{
                message.channel.send('That member was not found!');
            }
        }
        else if(CMD_NAME === 'ban'){
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permissions to use that command!');
            if(args.length === 0) return message.reply('Please provide an user. ');
            
            // .catch((err) => {
            //     console.log(err);
            // });
            try{
                const user = message.guild.members.ban(args[0]);
                message.channel.send(`Banned ${args}`);
            }
            catch(err){
                console.log(err);
                message.channel.send('An error occured or the user was not found!');
            }
        }
        else if(CMD_NAME === 'announce'){
            console.log(args);
            const msg = args.join(' ');
            webhookclient.send(msg);
        }

    }
});

client.on('messageReactionAdd', (reaction, user) => {
    console.log(`hello`);
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '797268697219334144') {
            switch(name){
                case '🍎' :
                    member.roles.add('797270006378397708')
                    break; 
                case '🍌' :
                    member.roles.add('797270082517991507');
                    break;
                case '👑' :
                    member.roles.add('797270129222221836');
                    break;
                case '🐍' :
                    member.roles.add('797270192232988692');
                    break;
            }
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    console.log(`hello`);
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '797268697219334144') {
            switch(name){
                case '🍎' :
                    member.roles.remove('797270006378397708')
                    break; 
                case '🍌' :
                    member.roles.remove('797270082517991507');
                    break;
                case '👑' :
                    member.roles.remove('797270129222221836');
                    break;
                case '🐍' :
                    member.roles.remove ('797270192232988692');
                    break;
            }
    }
});


client.login(process.env.DJSTOKEN); 
