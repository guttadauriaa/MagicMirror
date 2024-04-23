const NodeHelper = require("node_helper");
const { exec } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'START_PYTHON_SCRIPT') {
            const arg1 = "argument1";
            const arg2 = "argument2";
            exec(`python3 ./modules/test_module/test_module.py ${arg1} ${arg2}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }

                // stdout est la sortie de votre script Python
                this.sendSocketNotification('PYTHON_DATA', stdout);
            });
        }
    }
});