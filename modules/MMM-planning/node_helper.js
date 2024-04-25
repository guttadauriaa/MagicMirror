const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'START_NFC') {
          exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/nfc_reader.py`, (error, stdout, stderr) => {
              if (error) {
                  console.error(`Erreur d'exécution du script Python nfc: ${error}`);
                  return;
              }
              console.log(stdout);
              // stdout est la sortie de votre script Python
              this.sendSocketNotification('NFC', stdout);
          });
      }
      if (notification === 'START_PLANNING') {
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-planning/hyperplanning.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python planning: ${error}`);
                    return;
                }

                // stdout est la sortie de votre script Python
                this.sendSocketNotification('Planning', stdout);
            });
        }
        
    }
});
