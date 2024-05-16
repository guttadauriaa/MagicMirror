const NodeHelper = require("node_helper");
const { exec } = require("child_process");
const { log } = require("console");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("node_hepler inscription_NFC received: " + notification + ' '+ payload.suivant);
        if (notification === "ecouter"){
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/ecouter.py `, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python ecouter.py`);
                }

                console.log("[ecouter] La sortie est :", stdout);
                this.sendSocketNotification(payload.suivant, {sortie :stdout});
                
            });
        }

        

        if (notification === 'lecture_fichier_formations'){
            const fs = require('fs');
            console.log(payload.annee);
            try {
                let data = fs.readFileSync('./modules/MMM-voice_control/formations.json', 'utf8');
                let obj = JSON.parse(data);
                let formations = obj["BAB2"];
                console.log(formations);
                this.sendSocketNotification('retour_des_formations', {annee : payload.annee, formations : formations});
            } catch (err) {
                console.error("Erreur de lecture du fichier JSON:", err);
            }
            
        }
        
    }
});