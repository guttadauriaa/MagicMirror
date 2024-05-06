const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    
    socketNotificationReceived: function(notification, payload) {

        if (notification === 'VOICE_TEXT') {

            this.voiceControlProcess = exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/voice_control.py `, (error, stdout, stderr) => {

                console.log("lance voicecontrole")
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                this.sendSocketNotification('DISPLAY_TEXT', stdout);
            });
        }

        if (notification === 'demande_formation'){
            console.log("choix formation", payload)
            this.sendSocketNotification('demande_formation', {payload});

        }

        if (notification === 'STOP_VOICE_TEXT') {
            console.log("demande d'arret du contole vocal")
            // Vérifier si un processus de contrôle vocal est en cours
            if (this.voiceControlProcess) {
                // Si un processus est en cours, le tuer
                this.voiceControlProcess.kill('SIGINT');
                console.log("Arrêt du contrôle vocal");
                return;
            }
        }
    },

});
