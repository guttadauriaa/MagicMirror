Module.register("MMM-voice_control", {
    start: function() {
        this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'DISPLAY_TEXT') {
            let wrapper = document.getElementById('MMM-voice_control');
            if (wrapper) {
                wrapper.innerHTML = payload;
            }
            this.sendSocketNotification('VOICE_TEXT', {});
        }
        if (notification === 'NO_DISPLAY') {
            let wrapper = document.getElementById('MMM-voice_control');
            if (wrapper) {
                wrapper.innerHTML = "Parlez maintenant";
            }
            this.sendSocketNotification('VOICE_TEXT', {});
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-voice_control";
        wrapper.innerHTML = "En attente de phrases détectées...";
        return wrapper;
    }
});
