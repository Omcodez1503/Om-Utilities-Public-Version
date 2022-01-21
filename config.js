module.exports = {
	/* The token of your Discord Bot */
	token: "",
	/* For the support server */
	support: {
		id: "", // The ID of the support server
		logs: "", // And the ID of the logs channel of your server (new servers for example)
	},
	/* Dashboard configuration */
	dashboard: {
		enabled: true, // whether the dashboard is enabled or not
		secret: "", // Your discord client secret
		baseURL: "http://localhost:8080", // The base URl of the dashboard
		logs: "", // The channel ID of logs
		port: "8080", // Dashboard port
		expressSessionPassword: "", // Express session password (it can be what you want)
		failureURL: "http:omtecheducation.tk" // url on which users will be redirected if they click the cancel button (discord authentication)
	},
	mongoDB: "", // The URl of the mongodb database
	prefix: ">", // The default prefix for the bot
	/* For the embeds (embeded messages) */
	embed: {
		color: "#FF0000", // The default color for the embeds
		footer: "Om Utilities | Made With 💖" // And the default footer for the embeds
	},
	/* Bot's owner informations */
	owner: {
		id: "677970752242450463", // The ID of the bot's owner
		name: "President Om#2024" // And the name of the bot's owner
	},
	/* DBL votes webhook (optional) */
	votes: {
		port: 5000, // The port for the server
		password: "", // The webhook auth that you have defined on discordbots.org
		channel: "" // The ID of the channel that in you want the votes logs
	},
	/* The API keys that are required for certain commands */
	apiKeys: {
		// BLAGUE.XYZ: https://blague.xyz/
		blagueXYZ: "XXXXXXXXXXX",
		// FORTNITE TRN: https://fortnitetracker.com/site-api
		fortniteTRN: "",
		// FORTNITE FNBR: https://fnbr.co/api/docs
		fortniteFNBR: "",
		// DBL: https://discordbots.org/api/docs#mybots
		dbl: "",
		// AMETHYSTE: https://api.amethyste.moe
		amethyste: "",
	
	},
	/* The others utils links */
	others: {
		github: "https://github.com/Omcodez1503", // Founder's github account
		donate: "https://dsc.gg/omtecheducationgaming" // Donate link
	},
	/* The Bot status */
	status: [
		{
			name: "Om Utilities on {serversCount} servers",
			type: "LISTENING"
		},
		{
			name: "Om Tech Education Gaming : https://dsc.gg/omtecheducationgaming",
			type: "PLAYING"
		
		}
	]
};