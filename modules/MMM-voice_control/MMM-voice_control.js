Module.register("MMM-voice_control", {
    start: function() {
        this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
       
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

        if (notification === 'stopconfig'){ 
            console.log("stop config")
            this.sendSocketNotification('VOICE_TEXT', {});
            wrapper.innerHTML = `<h1> Configuration bien annulée. Demandez moi quelque chose </h1>`;
        }

        if (notification === 'pascompris'){
            console.log("pas compris")
            let html = '';
            html += `<h1> Je n'ai pas compris, veuillez réessayer. Si vous souhaitez annuler, dites "annuler" </h1>`;
            //html += obj;
            wrapper.innerHTML = html;

            this.sendSocketNotification('demande_formation', {});
        }  

        if (notification === 'validation_formation'){
            console.log("validation formation", payload)
            let html = '';
            html += `<h1> Vous avez choisi la formation ${payload}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
            wrapper.innerHTML = html;
            this.sendSocketNotification('validation_formation', payload);
            formation = payload;
        }

        //il faut ajouter les infos dasn le fichier total
        if (notification === 'valide') {
            console.log("formation valide")
            let html = '';
            html += `<h1> Formation validée. Demandez moi quelque chose </h1>`;
            wrapper.innerHTML = html; 
            this.sendSocketNotification('VOICE_TEXT', {});
        }

        if (notification === 'faux'){
            console.log("faux chiffre")
            let html = '';
            html += `<h1> Annulation de la demande. dites moi le numéro correct </h1>`;
            html += obj;
            wrapper.innerHTML = html;
            this.sendSocketNotification('demande_formation', {});
        }
    },

    notificationReceived: function(notification, payload, sender) {
        let wrapper = document.getElementById('MMM-voice_control');
        let formation = '';
        let badge = '';

        if (sender) {
            console.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
        } else {
            console.log(this.name + " received a system notification: " + notification);
        }


        if (notification === 'SETUP_BADGE'){
            console.log("modifiction du badge", payload)
            badge = payload;

            // const fs = require('fs');

            // try {
            //     const data = fs.readFileSync('formations.txt', 'utf8');
            //     const obj = JSON.parse(data);
            //     console.log(obj);
            // } catch (err) {
            //     console.error('Une erreur est survenue lors de la lecture du fichier', err);
            // }
            let html = '';
            html += `<h1> Dites le numéro de votre formation ou annuler pour arrêter</h1>`;
            //html += JSON.stringify(obj);
            wrapper.innerHTML = html;

            this.sendSocketNotification('demande_formation', payload);
        }
        

        if (notification === 'STOP_VOICE_TEXT') {
            console.log("demande d'arret du contole vocal")
            // Vérifier si un processus de contrôle vocal est en cours
            this.sendSocketNotification('STOP_VOICE_TEXT', {});
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
