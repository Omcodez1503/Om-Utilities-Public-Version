const Command = require("../../base/Command.js");
Discord = require("discord.js");

class Rps extends Command {

    constructor(client) {
        super(client, {
          name: "rock-papers-scissors",
          dirname: __dirname,
          enabled: true,
          guildOnly: false,
          aliases: ["rps"],
          memberPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
          botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
          nsfw: false,
          ownerOnly: false,
          cooldown: 3000,
        });
      }
      async run(message, args, data) {
        let embed = new Discord.MessageEmbed()
        .setTitle("RPS")
        .setDescription("React to play!")
        .setTimestamp()
        let msg = await message.channel.send(embed)
        await msg.react("🗻")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max: 1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                .setTitle("Result")
                .addField("Your Choice", `${reaction.emoji.name}`)
                .addField("Om Utilities Choice", `${me}`)
                await msg.edit(result)

                if((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "✂" && reaction.emoji.name === "📰") ||
                (me === "📰" && reaction.emoji.name === "🗻")) {
                    message.reply("You Lost!");
                } else if (me === reaction.emoji.name) {
                    return message.reply("Its a tie!");
                } else {
                    return message.reply("You Won!");
                }
            })
            .catch(collected => {
                message.reply('Process has been canceled, you failed to respond in time!');
            })
      }
}

module.exports = Rps;