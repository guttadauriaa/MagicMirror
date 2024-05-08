Module.register("MMM-voice_control", {
    start: function() {
        this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        let wrapper = document.getElementById('MMM-voice_control');
        let formation = '';
        let options = '';
       
        if (notification === 'DISPLAY_TEXT') {

            // Split stdout into lines
            let lines = payload.split('\n');
            
            // Get the first line
            let firstLine = lines[0];
            
            if (wrapper) {
                let html = `<h1>${firstLine}</h1>`;
                wrapper.innerHTML = html;
            }
            //si il y a 2 lignes cela veut que fonctionnalite.question a détecté une volonté de guidage vers un local dans le texte écouté
            if (lines[1]) {
                let secondLine = lines[1];
                console.log("secondLine", secondLine);
                this.sendNotification('GUIDAGE', secondLine);
            }

            // Attendre 5 secondes
            setTimeout(() => {
                this.sendSocketNotification('VOICE_TEXT', {});
                wrapper.innerHTML = `<h1>Attendez...</h1>`;
                // Attendre 2 secondes supplémentaires
                setTimeout(() => {
                    if (wrapper) {
                        //wrapper.innerHTML = `<h1> Dites : "miroir" pour demander quelque chose </h1>`;
                        wrapper.innerHTML = `<h1> Demandez moi quelque chose... </h1>`;
                    }
                }, 2000);
            }, 5000);         
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
            badge = payload.badge;
            let html = '';
            if (payload.redemander === true) {
                html += `<p>Je n'ai pas compris, veuillez réessayer.</p>`;
            }
            html = `<h1> Dites le numéro de votre année d'étude ou "annuler" pour arrêter</h1>`;
            
            html += `<p>(1) BAB1<br>(2) BAB2<br>(3) BAB3<br>(4) MA1<br>(5) MA2</p>`;
            wrapper.innerHTML = html;
            this.sendSocketNotification('demande_annee', {});
            //ajouter le badge dans le fichier local
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
        let html = `<h1> Demandez moi quelque chose </h1>`;
        html += '<p>Par exemple :</p>';
        html += `<p> - "Comment aller à l'auditoire 12"</p>`;
        html += `<p> - "Quels sont mes cours aujourd'hui"</p>`;
        wrapper.innerHTML = html;
        return wrapper;
    }
});
