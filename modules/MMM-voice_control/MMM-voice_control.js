Module.register("MMM-voice_control", {
    delfaults: {
        running : false,
        nfc_detecte : false
    },

    start: function() {
        this.voiceControlProcess = true;
        // on lance dans le node helper une notif pour directement écouter les requêtes de l'utilisateur
        //this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },


    socketNotificationReceived: function(notification, payload) {
        console.log(this.name+" received a socket notification: " + notification);
        let wrapper = document.getElementById('MMM-voice_control');
        let formation = '';
        let options = '';
       
        // apres avoir écouté la requête de l'utilisateur, on affiche le texte écouté
        if (notification === 'DISPLAY_TEXT') {
            
            // on sépare les lignes du texte écouté, si il y a deux lignes dans la sortie, alors l'utilisateur demande un guidage et la deuxième ligne contient le local
            let lines = payload.split('\n');
            let firstLine = lines[0];
            
            if (wrapper) {
                let html = `<h1>${firstLine}</h1>`;
                wrapper.innerHTML = html;
            }

            //si il y a 2 lignes cela veut que fonctionnalite.question a détecté une volonté de guidage vers un local dans le texte écouté
            if (lines[1]) {
                let secondLine = lines[1];
                console.log("secondLine", secondLine);
                // on envoie une notification pour demander le guidage dans le module MMM-navigation
                this.sendNotification('GUIDAGE', secondLine);
            }
            setTimeout(() => {
                let html = "<h1>Secouez votre main haut dessus de l'heure pour activer le contrôle vocal</h1>";
                wrapper.innerHTML = html;
            }, 5000);

            // Attendre 5 secondes
            if (this.voiceControlProcess && false){
                setTimeout(() => {
                    this.sendSocketNotification('VOICE_TEXT', {});
                    wrapper.innerHTML = `<h1>Attendez...</h1>`;
                    // Attendre 2 secondes supplémentaires
                    setTimeout(() => {
                        if (wrapper) {
                            let html = `<h1> Demandez moi quelque chose </h1>`;
                            html += '<h2>Par exemple :</h2>';
                            html += `<h2> - "Comment aller à l'auditoire 12"</h2>`;
                            //html += `<p> - "Quels sont mes cours aujourd'hui"</p>`;
                            wrapper.innerHTML = html;
                        }
                    }, 2000);
                }, 5000);    
            }     
            if (!this.voiceControlProcess){
                this.sendNotification('VOICE_TEXT_Stopped', {});
                return;
            }
        }
        

        if (notification === 'retour_des_options'){
            wrapper.innerHTML = `<h1> Dites le numéro de votre options ou "annuler" pour arrêter</h1><p>${payload}</p>`;
            this.sendSocketNotification('demande_options', {});
        }

        if (notification === 'CHOIX_OPTIONS'){
            console.log("choix options", payload)

            if (payload === "stop") { 
                wrapper.innerHTML = `<h1> Configuration bien annulée. Demandez moi quelque chose </h1>`;
                this.sendSocketNotification('VOICE_TEXT', {});
            }

            else {
                if (payload === "false") { 
                    wrapper.innerHTML = `<h1> Je n'ai pas compris, veuillez réessayer. Si vous souhaitez annuler, dites "annuler" </h1>`;
                    this.sendSocketNotification('demande_options', {});
                }
    
                else {
                    wrapper.innerHTML = `<h1> Vous avez choisi la formation ${payload}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
                    this.sendSocketNotification('validation_formation', "options");
                    options = payload;
                }
            }

            wrapper.innerHTML = `<h1> Vous avez choisi l'option ${payload}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
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
                    this.sendSocketNotification('validation_formation', "formation");
                    formation = payload;
                }
            }
            
        }

        
        if (notification === 'VALIDATION1'){

            if (payload === "true") { 
                console.log("formation valide")
                wrapper.innerHTML = `<h1> Formation validée. Choisissez maintenant votre option/groupe. (récupération en cours) </h1>`;
                this.sendSocketNotification('recup_option', formation);
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
                this.sendSocketNotification('validation_formation', "formation");
            }
        }

        if (notification === 'VALIDATION2'){

            if (payload === "true") { 
                console.log("opions valide")
                wrapper.innerHTML = `<h1> option validée. Vous pouvez maintenant scanner ce badge pour afficher votre horaire </h1>`;
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
                wrapper.innerHTML = `<h1> Je n'ai pas compris, veuillez réessayer. Vous avez choisi l'options ${options}. Si c'est correct, dites "valider" sinon dites "annuler" </h1>`;
                this.sendSocketNotification('validation_formation', "options");
            }
        }
        //il faut ajouter les infos dasn le fichier total
        if (notification === 'VOICE_TEXT_Stopped'){
            this.voiceControlProcess = false;
        }
    },


    // ensemble des notifications que le module peut recevoir depuis le système ou d'autres modules
    notificationReceived: function(notification, payload, sender) {
        let wrapper = document.getElementById('MMM-voice_control');
        let badge = '';
        console.log(this.name + " notification: " + notification);
        // si la notification est "HIDE_VOICE_CONTROL", on cache le module
        if(notification === 'HIDE_VOICE_CONTROL'){
            console.log("HIDE_VOICE_CONTROL")
            this.hide();
            this.voiceControlProcess = false;
            this.sendSocketNotification('STOP_VOICE_TEXT', {});
            this.sendSocketNotification('STOP_VOICE_TEXT2', {});
            
        }
        if (notification === 'SHOW_VOICE_CONTROL'){
            console.log("SHOW_VOICE_CONTROL")
            this.show();
            this.voiceControlProcess = true;
            //this.sendSocketNotification('VOICE_TEXT', {});
        }

        if (notification === 'retour_des_formations'){
            let html = '';
            html = `<h1> Dites le numéro de votre année d'étude ou "annuler" pour arrêter</h1>`;
            for (let formation of payload){
                html += `<p>(${formation.id}) ${formation.formation}<br></p>`;
            }
            
            wrapper.innerHTML = html;
            this.sendSocketNotification('demande_formation', {});
        }
        if (notification === 'NFC_DETECTE'){
            nfc_detecte = true;
            setTimeout(() => {
                nfc_detecte = false;
            }, 3000);
        }
        if (notification === 'MOTION_DETECTED' ){
            setTimeout(() => {
                if (nfc_detecte){
                    setTimeout(() => {
                        nfc_detecte = false;
                    }, 3000);
                }else{
                    this.sendSocketNotification('VOICE_TEXT', {});
                    wrapper.innerHTML = `<h1>Demande de contrôle vocal</h1>`;
                    if (wrapper) {
                        let html = `<h1> Demandez moi quelque chose </h1>`;
                        html += '<h2>Par exemple :</h2>';
                        html += `<h2> - "Comment aller à l'auditoire 12"</h2>`;
                        //html += `<p> - "Quels sont mes cours aujourd'hui"</p>`;
                        wrapper.innerHTML = html;
                    }
                }
            }, 1000);
            
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-voice_control";
        let html = "<h1>Secouez votre main haut dessus de l'heure pour activer le contrôle vocal</h1>";
        wrapper.innerHTML = html;
        return wrapper;
    }
});
