const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    
    socketNotificationReceived: function(notification, payload) {
        // if (notification === 'KEYWORD') {

        //     console.log("lance keyword")
        //     exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/mot_cle.py `, (error, stdout, stderr) => {
        //         if (error) {
        //             console.error(`Erreur d'exécution du script Python: ${error}`);
        //             //return;
        //         }
            
        //         this.sendSocketNotification('KEYWORDRECEIVED', "Demandez moi ce que vous souhaitez")
        //     });
        // }

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

        if (notification === 'STOP_VOICE_TEXT') {
            console.log("demande d'arret du contole vocal")
            // Vérifier si un processus de contrôle vocal est en cours
            if (this.voiceControlProcess) {
                // Si un processus est en cours, le tuer
                this.voiceControlProcess.kill('SIGINT');
                console.log("Arrêt du contrôle vocal");
            }
        }
    }
});
