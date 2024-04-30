const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'START_NFC') {

            let badge;

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/nfc_reader.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python nfc: ${error}`);
                    return;
            }
            console.log(stdout);

            badge = stdout.substring(0, 12);
            // stdout est la sortie de votre script Python
            this.sendSocketNotification('NFC', badge);
            });

            // exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/verif_badge.py`, (error, stdout2, stderr) => {
            //     if (error) {
            //         console.error(`Erreur d'exécution du script Python nfc: ${error}`);
            //         return;
            // }
            // console.log(stdout2);

            // if (stdout2 == "True")
            //     this.sendSocketNotification('NFC', badge);
            // else
            //     this.sendSocketNotification('NOT_NFT', badge);
            // });
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
        
    }
});
