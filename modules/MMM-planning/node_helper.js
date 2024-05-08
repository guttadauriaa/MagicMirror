const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'START_NFC') {
            console.log("start nfc reader")
            let badge; // Déclarer la variable à un niveau supérieur
    
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/nfc_reader.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python nfc: ${error}`);
                    return;
                }
    
                badge = stdout.substring(0, 12); // Assigner la valeur de stdout à la variable badge
                console.log("resultat = ", badge)

                //verif si le badge existe
                exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/verif_badge.py ${badge}`, (error2, stdout2, stderr2) => {
                    if (error2) {
                        console.error(`Erreur d'exécution du script Python verif_badge: ${error2}`);
                        return;
                    }
                    console.log(stdout2);
    
                    if (stdout2.trim() === "True") { 
                        this.sendSocketNotification('NFC', badge);
                    }
                    else{
                        this.sendSocketNotification('NOT_NFC', badge) 
                    }
                });
            });
        }


        if (notification === 'START_PLANNING') {
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/hyperplanning.py ${payload.NFCid}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python planning: ${error}`);
                    return;
                }
                console.log(stdout);
                // stdout est la sortie de votre script Python
                this.sendSocketNotification('Planning', stdout);
            });
        }

        if (notification === 'DING') {
            var player = require('play-sound')(opts = {})
            player.play('./modules/MMM-planning/ding.mp3', function(err){
            if (err) throw err
            })
        }
            
    }
});