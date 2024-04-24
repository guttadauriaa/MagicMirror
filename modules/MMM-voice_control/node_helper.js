const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'Start_voice_control') {
            console.log("Received text from voice recognition:", payload);
            // Envoyer la phrase détectée au module client
            this.sendSocketNotification('DISPLAY_TEXT', payload);
        }
    }
});
