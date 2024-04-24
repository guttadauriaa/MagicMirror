const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'VOICE_TEXT') {
            console.log("Received text from voice recognition:", payload);
            this.sendSocketNotification('DISPLAY_TEXT', payload);
        }
    }
});
