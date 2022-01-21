const Command = require("../../base/Command.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');


class meme extends Command {

	constructor (client) {
		super(client, {
			name: "meme",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["funny"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args) {
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(async json => {
                const memeEmbed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`${json.subreddit} ${json.postLink}`);


                let msg = await message.channel.send('Fetching you a meme...');
                msg.edit(memeEmbed);
            });
	}

}

module.exports = meme;