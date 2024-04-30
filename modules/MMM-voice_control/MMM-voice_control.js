Module.register("MMM-voice_control", {
    start: function() {
        this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        //pour demander le mot clé


        // if (notification === 'KEYWORDRECEIVED') {
        //     let wrapper = document.getElementById('MMM-voice_control');
        //     if (wrapper) {
        //         wrapper.innerHTML = `<h1>${payload}</h1>`;
        //     }
        //     this.sendSocketNotification('VOICE_TEXT', {})
        // }

        //s'exécute après avoir recu le mot clé
        if (notification === 'DISPLAY_TEXT') {
            let wrapper = document.getElementById('MMM-voice_control');
            if (wrapper) {
                let html = `<h1>${payload}</h1>`;
                wrapper.innerHTML = html;
            }

            // Attendre 5 secondes
            setTimeout(() => {
                this.sendSocketNotification('VOICE_TEXT', {});
                wrapper.innerHTML = `<h1>Attendez...</h1>`;
                // Attendre 2 secondes supplémentaires
                setTimeout(() => {
                    if (wrapper) {
                        //wrapper.innerHTML = `<h1> Dites : "miroir" pour demander quelque chose </h1>`;
                        wrapper.innerHTML = `<h1> Demandez moi quelque chose </h1>`;
                    }
                }, 2000);
            }, 5000);         
        }

        if (notification === 'SETUP_BADGE'){
            console.log("modifiction du badge", payload)
            wrapper.innerHTML = `<h1> Dites moi votre formation </h1>`;
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-voice_control";
        //wrapper.innerHTML = `<h1> Dites : "miroir" pour demander quelque chose </h1>`;
        wrapper.innerHTML = `<h1> Demandez moi quelque chose </h1>`;
        return wrapper;
    }
});
