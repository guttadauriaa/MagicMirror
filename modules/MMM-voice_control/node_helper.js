const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'VOICE_TEXT') {

            exec(`python3 ./modules/MMM-voice_control/voice_control.py `, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
            
                // Vérifier si stdout est vide
                if (stdout.trim() === '') {
                    console.log("La sortie stdout est vide.");
                    this.sendSocketNotification('NO_DISPLAY', stdout);
                } else {
                    console.log("La sortie stdout n'est pas vide :", stdout);
                    this.sendSocketNotification('DISPLAY_TEXT', stdout);
                }
            });
        }
    }
});
