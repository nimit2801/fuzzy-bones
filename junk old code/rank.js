const { createCanvas, loadImages } = require('canvas');
const { MeessageAttachment } = require('discord');

const { path } = require('join');

module.exports.run = async (client, message, args) => {
    const member = message.mention.members.first() || message.guild.member.cache.get(args[0]) || message.member;

    const data = await client
}

module.exports.help = {
    name: "rank",
    description: "View a members rank"
}

module.exports.requirements = {
    ownerOnly: false,
    userPerms: [],
    clientPerms: ["ATTACH_FILES"]
}

module.exports.limits = {
    rateLimit: 3,
    coolDown: 6e4
}