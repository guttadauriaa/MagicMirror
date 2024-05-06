Module.register("MMM-NFC", {
    start: function() {
        this.NFCid = null;
        this.sendSocketNotification('START_NFC', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'NFC') {
            this.NFCid = payload;
            wrapper.innerHTML = "<h1>En attente des données</h1>";
            this.sendSocketNotification('START_PLANNING', {NFCid : this.NFCid});
        }
        
        if (notification === 'NOT_NFC') {
            console.log("pas de badge connu");
            this.NFCid = payload;
            wrapper.innerHTML = "<h1>pas de badge connu</h1>";
            this.sendSocketNotification('START_NFC', {});
            this.sendSocketNotification('STOP_VOICE_TEXT', {});
            this.sendSocketNotification('SETUP_BADGE', {payload});
        }
    }
});