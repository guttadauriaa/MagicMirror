const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    
    socketNotificationReceived: function(notification, payload) {

        if (notification === 'VOICE_TEXT') {

            console.log("lance voicecontrole")
            this.voiceControlProcess = exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/voice_control.py `, (error, stdout, stderr) => {

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
            console.log("lance voicecontrole pour formation")

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/choix_formation.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                if (stdout.trim() === "stop") { 
                    console.log("envoie stop")
                    this.sendSocketNotification('stopconfig', {});
                }

                if (stdout.trim() === "false") { 
                    console.log("envoie pas compris")
                    this.sendSocketNotification('pascompris', {});
                }

                else{
                    console.log("envoie de la formation")
                    this.sendSocketNotification('validation_formation', stdout);
                }
            });
        }

        if (notification === 'validation_formation'){
            console.log("verification formation", payload)
            console.log("lance voicecontrole pour validation")
            
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/valider.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                if (stdout.trim() === "true") { 
                    this.sendSocketNotification('valide', {});
                }

                if (stdout.trim() === "false") { 
                    this.sendSocketNotification('faux', {});
                }
            });
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
