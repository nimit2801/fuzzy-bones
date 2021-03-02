'use strict'
require('dotenv').config();
const axios = require('axios');

var events = require('events');
const myEmitter = new events.EventEmitter();

function fun(){
    if(1<2)
    console.log('this happened');
}

myEmitter.on('fun1', fun);


const { Client, Role, WebhookClient, MessageEmbed, Message, DiscordAPIError, Guild } = require('discord.js');

const webhookclient = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
const connectDB = require('./connection');

//connectDB()
//    .then(console.log('Connected to database!'));
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "!";
client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`);
    
})

client.on('ready', () => {
    const servers = client.guilds.cache.size;
    const users = client.users.cache.size;
    
    console.log(`Bot is now online and serving in ${servers} Server and ${users} users`);

    client.user.setActivity(`with unicorns!`, {
        type: 'SINGING'
    });
})


function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

// this fuctions takes data from makecall and send an embeded stat for the valo player
const embed = (message, rank, matches, kills, deaths, assists, user) => {
    const ranks_img =   {
        "Iron 1" : 'https://static.wikia.nocookie.net/valorant/images/7/7f/TX_CompetitiveTier_Large_3.png/revision/latest/scale-to-width-down/185?cb=20200623203005',
        "Iron 2" : 'https://static.wikia.nocookie.net/valorant/images/2/28/TX_CompetitiveTier_Large_4.png/revision/latest/scale-to-width-down/185?cb=20200623203053',
        "Iron 3" : 'https://static.wikia.nocookie.net/valorant/images/b/b8/TX_CompetitiveTier_Large_5.png/revision/latest/scale-to-width-down/185?cb=20200623203101',
        "Bronze 1" : 'https://static.wikia.nocookie.net/valorant/images/a/a2/TX_CompetitiveTier_Large_6.png/revision/latest/scale-to-width-down/185?cb=20200623203119',
        "Bronze 2" : 'https://static.wikia.nocookie.net/valorant/images/e/e7/TX_CompetitiveTier_Large_7.png/revision/latest/scale-to-width-down/185?cb=20200623203140',
        "Bronze 3" : 'https://static.wikia.nocookie.net/valorant/images/a/a8/TX_CompetitiveTier_Large_8.png/revision/latest/scale-to-width-down/185?cb=20200623203313',
        "Silver 1" : 'https://static.wikia.nocookie.net/valorant/images/0/09/TX_CompetitiveTier_Large_9.png/revision/latest/scale-to-width-down/185?cb=20200623203408',
        "Silver 2" : 'https://static.wikia.nocookie.net/valorant/images/c/ca/TX_CompetitiveTier_Large_10.png/revision/latest/scale-to-width-down/185?cb=20200623203410',
        "Silver 3" : 'https://static.wikia.nocookie.net/valorant/images/1/1e/TX_CompetitiveTier_Large_11.png/revision/latest/scale-to-width-down/185?cb=20200623203413',
        "Gold 1" : 'https://static.wikia.nocookie.net/valorant/images/9/91/TX_CompetitiveTier_Large_12.png/revision/latest/scale-to-width-down/185?cb=20200623203413',
        "Gold 2" : 'https://static.wikia.nocookie.net/valorant/images/4/45/TX_CompetitiveTier_Large_13.png/revision/latest/scale-to-width-down/185?cb=20200623203415',
        "Gold 3" : 'https://static.wikia.nocookie.net/valorant/images/c/c0/TX_CompetitiveTier_Large_14.png/revision/latest/scale-to-width-down/185?cb=20200623203417',
        "Platinum 1" : 'https://static.wikia.nocookie.net/valorant/images/d/d3/TX_CompetitiveTier_Large_15.png/revision/latest/scale-to-width-down/185?cb=20200623203419',
        "Platinum 2" : 'https://static.wikia.nocookie.net/valorant/images/a/a5/TX_CompetitiveTier_Large_16.png/revision/latest/scale-to-width-down/185?cb=20200623203606',
        "Platinum 3" : 'https://static.wikia.nocookie.net/valorant/images/f/f2/TX_CompetitiveTier_Large_17.png/revision/latest/scale-to-width-down/185?cb=20200623203607',
        "Diamond 1" : 'https://static.wikia.nocookie.net/valorant/images/b/b7/TX_CompetitiveTier_Large_18.png/revision/latest/scale-to-width-down/185?cb=20200623203609',
        "Diamond 2" : 'https://static.wikia.nocookie.net/valorant/images/3/32/TX_CompetitiveTier_Large_19.png/revision/latest/scale-to-width-down/185?cb=20200623203610',
        "Diamond 3" : 'https://static.wikia.nocookie.net/valorant/images/1/11/TX_CompetitiveTier_Large_20.png/revision/latest/scale-to-width-down/185?cb=20200623203611',
        "Immoratal 1" : 'https://static.wikia.nocookie.net/valorant/images/8/86/TX_CompetitiveTier_Large_21.png/revision/latest/scale-to-width-down/185?cb=20200623203613',
        "Immoratal 2" : 'https://static.wikia.nocookie.net/valorant/images/e/e5/TX_CompetitiveTier_Large_22.png/revision/latest/scale-to-width-down/185?cb=20200623203615',
        "Immoratal 3" : 'https://static.wikia.nocookie.net/valorant/images/f/f9/TX_CompetitiveTier_Large_23.png/revision/latest/scale-to-width-down/185?cb=20200623203617',
        "Radiant" : 'https://static.wikia.nocookie.net/valorant/images/2/24/TX_CompetitiveTier_Large_24.png/revision/latest/scale-to-width-down/185?cb=20200623203621'
    };
    const floor10 = (value, exp) => decimalAdjust('floor', value, exp);
    const kd = floor10(kills/deaths, -2);
    const embed = new MessageEmbed()
    .setTitle('Valorant Stats')
    .setColor(0xff0000)
    .addField('matches', matches)
    .addField('kills', kills)
    .addField('deaths', deaths)
    .addField('kd', kd)
    .addField('assists', assists)
    .setDescription(`Valorant Stats for ${user}`)
    .setImage(ranks_img[rank])
    .addField('Rank', rank)
    .setTimestamp()
    .setFooter('Valorant Stats by Fuzzy-Bones');
//    console.log(embed.color, embed.fields, embed//.toJSON());
    message.channel.send(embed);
}

// this function makes an call to the unofficial valo api and returns sends data to embed()
const makecall = async (args, message) => {
    let valogamename = args[0];
    let valogameid = args[1]; 
    //console.log(valogamename, valogameid);
    await axios.get(`https://api.henrikdev.xyz/valorant/v1/profile/${valogamename}/${valogameid}`)
    .then( response => {
        // console.log(response.data);
        let data = response.data.stats;
        let { rank, matches, kills, deaths, assists} = data;
        embed(message, rank, matches, kills, deaths, assists, response.data.user);
        //console.log(data);
        //message.channel.send(`User: ${response.data.user}\nrank: ${rank}\nmatches: ${matches}\nkills: ${kills}\ndeaths: ${deaths}\nassists: ${assists}`)
    })
    .catch( err => {
        console.log(err)
    })
}

const makeGitHubCall = async (args, message) => {
    await axios.get(`https://api.github.com/users/${args[0]}`)
    .then( response => {
        let data = response.data;
        console.log(data);
        const { login, avatar_url, html_url, url, name, followers, following, public_repos, public_gists, create_at, updated_at } = data;
        const messageGitHubEmbed = new MessageEmbed()
        .setTitle(`GitHub Profile`)
        .setURL(html_url)
        .setImage(avatar_url)
        .addField('Username', login)
        .addField('Name', name)
        .addField('Repos', public_repos)
        .addField('Following', following)
        .addField('Followers', followers)
        .addField('Follow me here', html_url)
        .setFooter('GitHub Stats by Fuzzy Bones')
        .setTimestamp();
        message.channel.send(messageGitHubEmbed);
    })
    .catch(e => {
        console.log(`ERROR: ${e}`); 
    })
};

let channels = ['793368291213181009'];

client.on('message', async (message) => {
    if(message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
        //console.log(CMD_NAME);
        switch(CMD_NAME){
            case "setChannel": {
                channels.push(message.channel.id);
                message.channel.send('This channel was added in the anonymous channels list!')
                console.log(message.channel.id);
            }
            break;
            case "ismebot": {
                if(message.author.bot === true)
                    message.reply('you\'re bot!')
                else
                    message.reply('you\'re not a bot!')
            }
            break;
            case "aa" : {
                let m = new MessageEmbed()
                    .addField('A', 'B', [true]);
                message.channel.send(m);
            }
            case "server-stats" : {
                console.log(client.systemChannelID);
            }
            break;
            case "uptime" : {
                console.log(client.uptime);
            }
            break;
            case "asd" : {
                veer()
            }
            case "github-user": {
                makeGitHubCall(args, message);
            }
            break;
            case "help" : {
                const help = require('./commands/help');
                const data = help(client).data;
                message.author.send(data);
            }
            break;
            case "me": {
                message.author.send('umm hey!')
            }
            break;
            case "who" :{
                if(args[0] === 'u')
                    message.reply('umm yo daddy honey!');
                else return
            }
            break;
            case "bye" : {
                try {
                    await message.channel.send('I\'m gonna go and take some rest by fam.');    // Send the message
                  
                    await message.delete();                   // Delete the command message
                    await client.user.setStatus('invisible'); // Mark the client as offline (instead of waiting)
                    await client.destroy();  
                    console.log('sleep');                 // Remove the client instance
                  } catch(err) {
                    console.error(err);                       // Return any errors from rejected promises
                  }
            }
            break;
            case "hi" : {
                message.channel.send('hello @here how are you guys!');
            }
            break;
            case "roles" : {
                let p = args[0];
                p = p.replace('>', '')
                p = p.replace('<@&', '')
                const rolesNumber = new Role(client, message.guild.roles.cache.get(p), message.guild).members.size;
                message.channel.send(rolesNumber);
            }
            break;
            case "val-stats" : {
                makecall(args, message);
            };
            break;
            case "goodnight" : {
                message.reply('Goodnight bumble bee!');
            }
            break;
            case "valo-stat" : {
                makecall(args, message);
            }
            break;
            case "kick": {
                if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to use that command!');
                if(args.length === 0) return message.reply('Please provide an user. ');
                let p = args[0];
                p = p.replace('>', '');
                p = p.replace('<@!', ''); //<@& //<@!
                const member = message.guild.members.cache.get(p);
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
            break;
            case "ban" : {
                console.log(message.member);
                if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permissions to use that command!');
                if(args.length === 0) return message.reply('Please provide an user. ');
                
                // .catch((err) => {
                //     console.log(err);
                // });
                try{
                    // const ban_ = message.author.id;
                    let p = args[0];
                    p = p.replace('>', '');
                    p = p.replace('<@!', '');
                    const user = message.guild.members.ban(p)
                    .then( user => {
                        message.channel.send(`Banned ${args}`);
                    }).catch(e => {
                        message.channel.send('An error occured or the user was not found!');
                    });
                    
                }
                catch(err){
                    console.log(err);
                    message.channel.send('An error occured or the user was not found!');
                }
            }
            break; 
            case "fuckme" : message.channel.send('fuck you')
            break;
            // case "casd";
        }
        // else if(CMD_NAME === 'announce'){
        //     console.log(args);
        //     const msg = args.join(' ');
        //     webhookclient.send(msg);
        // }

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



client.on('message', async message => {
    if(channels.includes(message.channel.id) && message.author.bot === false && message.member.hasPermission('ADMINISTRATOR')){
        message.delete()
            .then(message.channel.send(`Anonymous user said: ${message.content}`))
            .catch(console.error)
    }
})

client.off('message', async message => {
    message.send.channel('bye amigos me going offline don\'t have fun without me');
})

const uptime_ = () => {
    if(client.uptime>500)
        myEmitter.emit('fun1');
}

uptime_();

client.login(process.env.DJSTOKEN); 
