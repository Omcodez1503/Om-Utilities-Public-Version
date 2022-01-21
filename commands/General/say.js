const Command = require("../../base/Command.js");
const Discord = require('discord.js');

class Say extends Command {

	constructor (client) {
		super(client, {
			name: "say",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "s" ],
			memberPermissions: [ "ADMINISTRATOR" ],
			botPermissions: [ "SEND_MESSAGES" ], // new EMBED_LINKS permission, the bot needs to send embeds
 			nsfw: false,
			ownerOnly: false,
			cooldown: 0
		});
	}

	async run (message, args) {

       const sayContent = args.join(' ');
       message.delete();
       const embed = new Discord.MessageEmbed().setDescription(sayContent);
       message.channel.send(embed);

	}

}

module.exports = Say;