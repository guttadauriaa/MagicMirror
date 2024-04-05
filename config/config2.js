//ajout 2eme ecran (2)
var config = {
	electronOptions: { x: 1920 },
	address: "0.0.0.0", // can be whatever you set as your original.
	port: 8081, // Must be different than the other configuration file.
	ipWhitelist: [], // Can be whatever you set as your original.
	language: "en",
	timeFormat: 12,
	units: "imperial",
	//logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"],
	modules: [
        {
			module: "helloworld",
			position: "middle_center",
			header: "Petit mot du jour",
			config: {
				text: "Bonjour à tous, bienvenue à la faculté !"
			}
		}
	] // end of modules
}; // end of config variable.
/*************** DO NOT EDIT BELOW ***************/
if (typeof module !== "undefined") {
	module.exports = config;
}
