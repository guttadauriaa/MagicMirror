/* MagicMirror² 
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	//electronOptions: {fullscreen: false, x: 1081,y : 0},  //1440X900 Xwayland3 (miroir droite)
	electronOptions: {fullscreen:false, x: 0, y:1081},
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "fr",
	locale: "fr-BE",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		// {
		// 	module: "alert",
		// },
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		// {
		// 	module: "clock",
		// 	position: "top_left"
		// },
		// {
		// 	module: "calendar",
		// 	header: "Calendrier",
		// 	position: "top_left",
		// 	config: {
		// 		calendars: [
		// 			{
		// 				fetchInterval: 7 * 24 * 60 * 60 * 1000,
		// 				symbol: "calendar-check",
		// 				url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics"
		// 			}
		// 		]
		// 	}
		// },
		{
			module: "test_module",
			position: "middle_center",
		},
		{
			module: "menu_houzeau",
			position: "middle_center",
		},
		// {
		// 	module: "helloworld",
		// 	position: "middle_center",
		// 	header: "Petit mot du jour",
		// 	config: {
		// 		text: "Bonjour à tous, bienvenue à la faculté !"
		// 	}
		// },
		
		// {
		// module: "newsfeed",
		// position: "bottom_left",
		// config: {
		// 	feeds: [
		// 		{
		// 			title: "Umons News",
		// 			//url: "https://web.umons.ac.be/fr/feed/events-screens"
		// 			url: "https://web.umons.ac.be/fr/feed/screens"
					
		// 		}
		// 	],
		// 	showSourceTitle: true,
		// 	showPublishDate: true,
		// 	broadcastNewsFeeds: true,
		// 	broadcastNewsUpdates: true
		// }
		// },
		// {
		// 	module: "helloworld",
		// 	position: "bottom_right",
		// 	header: "Menu du jour",
		// 	config: {
		// 		text: "Menu du jour"
		// 	}
		// },
		// {
		// 	module: "MMM-planning",
		// 	position: "top_right",
		// 	header: "Hyperplanning",
		// 	config: {
		// 	  scriptPath: "/MagicMirror/modules/MMM-planning/hyperplanning.py"
		// 	}
		//   },
		
		{
			module : "MMM-voice_control",
			position: "top_center"
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
