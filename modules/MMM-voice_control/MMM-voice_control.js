Module.register("MMM-voice_control", {
    start: function() {
        this.voiceControlProcess = true;
        // on lance dans le node helper une notif pour directement écouter les requêtes de l'utilisateur
        this.sendSocketNotification('VOICE_TEXT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
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

            // Attendre 5 secondes
            setTimeout(() => {
                if (this.voiceControlProcess){
                    this.voiceControlProcess = false;
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
                }
            }, 5000);         
        }else{
            this.voiceControlProcessStopedChek = true;
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

        // si la notification est "HIDE_VOICE_CONTROL", on cache le module
        if(notification === 'HIDE_VOICE_CONTROL'){
            console.log("HIDE_VOICE_CONTROL")
            this.hide();
            this.voiceControlProcess = false;
            this.sendSocketNotification('STOP_VOICE_TEXT', {});
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

        //deplace dans le module inscription_NFC
        if (notification === 'SETUP_BADGE_ancien'){
            console.log("modifiction du badge", payload)
            badge = payload.badge;
            this.voiceControlProcess = false;
            this.voiceControlProcessStopedChek = false;
            //this.sendSocketNotification('STOP_VOICE_TEXT', {});
            // Vérifier si un processus de contrôle vocal est en cours
            
            // while (this.voiceControlProcess === true){
            //     setTimeout(() => {
            //         if(this.voiceControlProcess === false){
            //             console.log("voiceControlProcess = false")
            //         }
            //     }, 1000); 
            // }
            
            while(this.voiceControlProcessStopedChek === false){
                console.log("waiting for voiceControlProcessStopedChek")
            }
              
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
        
        // suppresion de cette fonctionnalité dans la derniere version
        if (notification === 'STOP_VOICE_TEXT') {
            console.log("demande d'arret du contole vocal")
            this.voiceControlProcess = false;
            // Vérifier si un processus de contrôle vocal est en cours
            this.sendSocketNotification('STOP_VOICE_TEXT', {});
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-voice_control";
        //wrapper.innerHTML = `<h1> Dites : "miroir" pour demander quelque chose </h1>`;
        let html = `<h1> Demandez moi quelque chose </h1>`;
        html += '<h2>Par exemple :</h2>';
        html += `<h2> - "Comment aller à l'auditoire 12"</h2>`;
        //html += `<p> - "Quels sont mes cours aujourd'hui"</p>`;
        wrapper.innerHTML = html;
        return wrapper;
    }
});
