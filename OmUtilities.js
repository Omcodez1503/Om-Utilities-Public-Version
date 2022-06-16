require("./helpers/extenders");

const Sentry = require("@sentry/node"),
	util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir),
	mongoose = require("mongoose"),
	chalk = require("chalk");

const config = require("./config");
if(config.apiKeys.sentryDSN){
	try {
		Sentry.init({ dsn: config.apiKeys.sentryDSN });
	} catch (e) {
		console.log(e);
		console.log(chalk.yellow("Looks like your Sentry DSN key is invalid. If you do not intend to use Sentry, please remove the key from the configuration file."));
	}
}

// Load Om Utilities class
const OmUtilities = require("./base/Om"),
	client = new OmUtilities();

const init = async () => {

	// Search for all commands
	const directories = await readdir("./commands/");
	client.logger.log(`Loading a total of ${directories.length} categories.`, "log");
	directories.forEach(async (dir) => {
		const commands = await readdir("./commands/"+dir+"/");
		commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
			const response = client.loadCommand("./commands/"+dir, cmd);
			if(response){
				client.logger.log(response, "error");
			}
		});
	});

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
	evtFiles.forEach((file) => {
		const eventName = file.split(".")[0];
		client.logger.log(`Loading Event: ${eventName}`);
		const event = new (require(`./events/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
    
	client.login(client.config.token); // Log in to the discord api

	// connect to mongoose database
	mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
		client.logger.log("Connected to the Mongodb database.", "log");
	}).catch((err) => {
		client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
	});

	const languages = require("./helpers/languages");
	client.translations = await languages();
    
	const autoUpdateDocs = require("./helpers/autoUpdateDocs.js");
	autoUpdateDocs.update(client);

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
	console.error(err);
});

const express = require('express')
const app = express();
const port = 3000
const Discord = require('discord.js');
const emojis = require('./emojis.json')
app.listen(port, () =>
console.log(`Creator: PresidentOm`)
);
const { MessageButton, MessageActionRow } = require('discord-buttons'); 
require('discord-buttons')(client);


client.on("message", (message) => {
let owner = ['677970752242450463',] 

if (!owner.includes(message.author.id)) return; 

if (message.content !== `${emojis.command}`) return;
  const embed = new Discord.MessageEmbed()
  .setTitle("Verify")
  .setDescription("Hey there! Welcome to OTEG. Press the button below to verify!")
  .setColor('#2f3136')
  .setFooter('Made by President Om#2024)
  
  let verify = new MessageButton()
   .setLabel("Verify")
   .setStyle("blurple")
   .setEmoji("✅")
   .setID("Verify")


  message.channel.send({
    button: verify,
    embed: embed 
  });
})
client.on('clickButton', async (button) => {
    if (button.id !== "Verify") return;
    button.reply.send('You are now sucessfully verified.', true)
  const roles = button.guild.roles.cache.get(`${emojis.roleID2}`)
    const member = button.clicker.member
    await member.roles.add(roles)
})
client.on('clickButton', async (button) => {
    if (button.id !== "Verify") return;
    button.reply.send('You are now sucessfully verified.', true)
    const role = button.guild.roles.cache.get(`${emojis.roleID}`)
    const member = button.clicker.member
    await member.roles.add(role)
})

client.login(process.env.TOKEN) 
