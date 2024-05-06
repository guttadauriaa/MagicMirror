const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    notificationReceived: function(notification, payload) {


        if (notification === 'START_PLANNING') {
            console.log("start planning reader")
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
