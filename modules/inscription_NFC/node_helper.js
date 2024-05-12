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
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/ecouter.py `,{ timeout: 5000 }, (error, stdout, stderr) => {
                if (error) {
                    //console.error(`Erreur d'exécution du script Python ecouter.py: ${error}`); //erreur de type ALSA lorsqu'on veut arrêter le script
                    console.error(`Erreur d'exécution du script Python ecouter.py`);
                }
                this.sendSocketNotification(payload.suivant, {sortie :stdout});
            });  
        }

        

        if (notification === 'lecture_fichier_formations'){
            const fs = require('fs');
            console.log(annee);
            fs.readFileSync('./modules/MMM-voice_control/formations.json', (err, data) => {
                if (err) {
                    console.error("Erreur de lecture du fichier JSON:", err);
                    return;
                }
                try {
                    let obj = JSON.parse(data);
                    let formations = obj.BAB1;
                    console.log(formations);
                    this.sendSocketNotification('retour_des_formations', formations);

                } catch (error) {
                    console.error("Erreur lors de l'analyse JSON:", error);
                }
                this.sendSocketNotification('retour_des_formations', {redemander : false, annee : annee});
            });
        }
        
    }
});