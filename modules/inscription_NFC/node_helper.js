const NodeHelper = require("node_helper");
const { exec } = require("child_process");
const { log } = require("console");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        
        
    }
});