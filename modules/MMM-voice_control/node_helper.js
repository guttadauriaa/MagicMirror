const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'VOICE_TEXT') {

            console.log("ici");
            exec(`python3 ./modules/MMM-voice_control/voice_control.py `, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }

                // stdout est la sortie de votre script Python
                console.log(stdout);
                this.sendSocketNotification('DISPLAY_TEXT', stdout);
            });

            //console.log("Received text from voice recognition:", payload);
            //this.sendSocketNotification('DISPLAY_TEXT', payload);
        }
    }
});
