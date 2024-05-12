const NodeHelper = require("node_helper");
const { exec } = require("child_process");
const { log } = require("console");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {

        // notification pour lancer la recherche d'un badge NFC
        if (notification === 'START_NFC') {
            console.log("start nfc reader")
            let badge; // Déclarer la variable à un niveau supérieur
    
            // execute le script Python nfc_reader.py pour lire le badge NFC
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/nfc_reader.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python nfc: ${error}`);
                    return;
                }
    
                // stdout est la sortie de votre script Python contenant le badge NFC
                badge = stdout.substring(0, 12); 
                console.log("resultat = ", badge)

                //verif si le badge existe grace au script verif_badge.py
                exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/verif_badge.py ${badge}`, (error2, stdout2, stderr2) => {
                    if (error2) {
                        console.error(`Erreur d'exécution du script Python verif_badge: ${error2}`);
                        return;
                    }
                    console.log(stdout2);
    
                    // si le badge existe, on envoie une notification NFC au module MMM-planning
                    if (stdout2.trim() === "True") { 
                        this.sendSocketNotification('NFC', badge);
                    }
                    // sinon, on envoie une notification NOT_NFC au module MMM-planning
                    else{
                        this.sendSocketNotification('NOT_NFC', badge) 
                    }
                });
            });
        }

        // notification pour lancer le script Python planning.py et récupérer le planning de l'étudiant
        if (notification === 'START_PLANNING') {
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/hyperplanning.py ${payload.NFCid}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python planning: ${error}`);
                    return;
                }
                console.log(stdout);
                // on envoie le planning au module MMM-planning
                this.sendSocketNotification('Planning', stdout);
            });
        }

        if (notification === 'DING') {
            
            console.log("ding");
            var player = require('play-sound')(opts = {});
            player.play('/home/miroir/MagicMirror/modules/MMM-planning/ding.mp3', function(err){
            if (err) console.error("Erreur lors de la lecture du son :", err);
            })
        }
    }
});