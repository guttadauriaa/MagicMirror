Module.register("MMM-voice_control", {
    start: function() {
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'DISPLAY_TEXT') {
            let wrapper = document.getElementById('MMM-voice_control');
            if (wrapper) {
                wrapper.innerHTML = payload;
            }
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-voice_control";
        wrapper.innerHTML = "En attente de phrases détectées...";
        return wrapper;
    }
});
