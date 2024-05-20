const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {

        // notification pour lancer le script Python qui va chercher à afficher le menu houzeau
        if (notification === 'START_MENU_HOUZEAU') {
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/menu_houzeau/menu_houzeau.py`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                // renvoie les données du script Python au module menu_houzeau.js
                this.sendSocketNotification('PYTHON_DATA_MENU_HOUZEAU', stdout);
            });
        }
    }
});