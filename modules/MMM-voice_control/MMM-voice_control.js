Module.register("MMM-voice_control", {
    start: function() {
        this.sendSocketNotification('KEYWORD', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        //pour demander le mot clé
        if (notification === 'KEYWORDRECEIVED') {
            let wrapper = document.getElementById('MMM-voice_control');
            if (wrapper) {
                wrapper.innerHTML = payload;
            }
            this.sendSocketNotification('VOICE_TEXT', {})
        }

        //s'exécute après avoir recu le mot clé
        if (notification === 'DISPLAY_TEXT') {
            let wrapper = document.getElementById('MMM-voice_control');
            if (wrapper) {

                let html = '<h1>${payload}</h1>';
                wrapper.innerHTML = html;
            }

            // Attendre 3 secondes
            setTimeout(() => {
                // Attendre 2 secondes supplémentaires
                setTimeout(() => {
                    if (wrapper) {
                        wrapper.innerHTML = "Dites : \"miroir\" pour demander quelque chose";
                    }
                }, 2000);
            }, 3000);

            this.sendSocketNotification('KEYWORD', {});
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-voice_control";
        wrapper.innerHTML = "Dites : \"miroir\" pour demander quelque chose. èéà. l'";
        return wrapper;
    }
});
