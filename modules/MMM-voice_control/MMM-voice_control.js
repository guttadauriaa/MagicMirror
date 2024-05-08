Module.register("MMM-voice_control", {
    start: function() {
        this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        let wrapper = document.getElementById('MMM-voice_control');
        let formation = '';
       
        if (notification === 'DISPLAY_TEXT') {
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

        if (notification === 'CHOIX_FORMATION'){
            console.log("choix formation", payload)
            
            if (payload === "stop") { 
                wrapper.innerHTML = `<h1> Configuration bien annulée. Demandez moi quelque chose </h1>`;
                this.sendSocketNotification('VOICE_TEXT', {});
            }

            else {
                if (payload === "false") { 
                    wrapper.innerHTML = `<h1> Je n'ai pas compris, veuillez réessayer. Si vous souhaitez annuler, dites "annuler" </h1>`;
                    this.sendSocketNotification('demande_formation', {});
                }
    
                else {
                    wrapper.innerHTML = `<h1> Vous avez choisi la formation ${payload}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
                    this.sendSocketNotification('validation_formation', payload);
                    formation = payload;
                }
            }
            
        }

        if (notification === 'retour_des_formations'){
            wrapper.innerHTML = `<h1> Dites le numéro de votre formation ou annuler pour arrêter</h1><p>${payload}</p>`;
            this.sendSocketNotification('demande_formation', {});
        }


        if (notification === 'VALIDATION'){

            if (payload === "true") { 
                console.log("formation valide")
                wrapper.innerHTML = `<h1> Formation validée. Demandez moi quelque chose </h1>`;
                this.sendSocketNotification('VOICE_TEXT', {});
            }

            if (payload === "false") { 
                console.log("faux chiffre")
                //let html = '';

                //html += `<h1> Annulation de la demande. dites moi le numéro correct </h1>`;
                //html += obj;
                wrapper.innerHTML = `<h1> Annulation de la demande. dites moi le numéro correct ou dites "annuler" pour arrêter la configuration du badge</h1>`;
                this.sendSocketNotification('demande_formation', {});
            }

            if (payload === "not_ok") {
                console.log("pas compris")
                //let html = '';

                //html += `<h1> Je n'ai pas compris, veuillez réessayer. Vous avez choisi la formation ${formation}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
                //html += obj;
                wrapper.innerHTML = `<h1> Je n'ai pas compris, veuillez réessayer. Vous avez choisi la formation ${formation}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
                this.sendSocketNotification('validation_formation', {});
            }
        }
        //il faut ajouter les infos dasn le fichier total
        
    },

    notificationReceived: function(notification, payload, sender) {
        let wrapper = document.getElementById('MMM-voice_control');
        let badge = '';

        if (sender) {
            console.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
        } else {
            console.log(this.name + " received a system notification: " + notification);
        }


        if (notification === 'SETUP_BADGE'){
            console.log("modifiction du badge", payload)
            badge = payload;
            
            this.sendSocketNotification('lecture_formations', {});
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
