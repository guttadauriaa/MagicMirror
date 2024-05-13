const NodeHelper = require("node_helper");
const { exec } = require("child_process");
const { log } = require("console");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("node_hepler inscription_NFC received a socket notification: " + notification);
        if (notification === "ecouter"){
            let retryCount = 0;

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/ecouter.py `, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python ecouter.py`);

                    // Si une erreur se produit et que nous n'avons pas encore réessayé, réessayons une fois
                    if (retryCount < 1) {
                        retryCount++;
                        exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/ecouter.py `, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`Erreur d'exécution du script Python ecouter.py lors de la deuxième tentative`);
                            }
                            this.sendSocketNotification(payload.suivant, {sortie :stdout});
                        });
                    }
                } else {
                    this.sendSocketNotification(payload.suivant, {sortie :stdout});
                }
            });
        }

        

        if (notification === 'lecture_fichier_formations'){
            const fs = require('fs');
            console.log(payload.annee);
            try {
                let data = fs.readFileSync('./modules/MMM-voice_control/formations.json', 'utf8');
                let obj = JSON.parse(data);
                let formations = obj.BAB1;
                console.log(formations);
                this.sendSocketNotification('retour_des_formations', formations);
            } catch (err) {
                console.error("Erreur de lecture du fichier JSON:", err);
            }
            
        }
        
    }
});