const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Stats extends Command {

	constructor (client) {
		super(client, {
			name: "stats",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "statistics", "infobot", "botinfos", "bot-infos", "bot-info", "infos-bot", "info-bot" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const statsEmbed = new Discord.MessageEmbed()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer)
			.setAuthor(message.translate("common:STATS"))
			.setDescription(message.translate("general/stats:MADE"))
			.addField(this.client.customEmojis.stats+" "+message.translate("general/stats:COUNTS_TITLE"), message.translate("general/stats:COUNTS_CONTENT", {
				servers: this.client.guilds.cache.size,
				users: this.client.users.cache.size
			}), true)
			.addField(this.client.customEmojis.version+" "+message.translate("general/stats:VERSIONS_TITLE"), `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\``, true)
			.addField(this.client.customEmojis.ram+" "+message.translate("general/stats:RAM_TITLE"), `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
			.addField(this.client.customEmojis.status.online+" "+message.translate("general/stats:ONLINE_TITLE"), message.translate("general/stats:ONLINE_CONTENT", {
				time: message.convertTime(Date.now()+this.client.uptime, "from", true)
			}))
			.addField(this.client.customEmojis.voice+" "+message.translate("general/stats:MUSIC_TITLE"), message.translate("general/stats:MUSIC_CONTENT", {
				count: this.client.voice.connections.size
			}))
			

		statsEmbed.addField(this.client.customEmojis.link+" "+message.translate("general/stats:LINKS_TITLE"), message.translate("misc:STATS_FOOTER", {
			donateLink: "https://dsc.gg/omtecheducationgaming",
			dashboardLink: "https://dsc.gg/omtecheducationgaming",
			inviteLink: await this.client.generateInvite({
				permissions: [Discord.Permissions.FLAGS.ADMINISTRATOR]
			}),
			githubLink: "https://github.com/Omcodez1503",
			supportLink: "https://dsc.gg/omtecheducationgaming"
		})
		);
		message.channel.send(statsEmbed);

	}

}

module.exports = Stats;
