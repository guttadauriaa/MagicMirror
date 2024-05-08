const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    
    socketNotificationReceived: function(notification, payload) {

        if (notification === 'VOICE_TEXT') {
            console.log("lance voicecontrole")
            this.voiceControlProcess = exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/voice_control.py `, (error, stdout, stderr) => {

                if (!this.voiceControlProcess) {
                    return;
                }
                
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);
            
                this.sendSocketNotification('DISPLAY_TEXT', stdout);
                
            });
        }

        if (notification === 'recup_option') {
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/choix_options.py ${payload}`, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                this.sendSocketNotification('retour_des_options', stdout);

            });
        }

        if (notification === 'lecture_formations'){
            const fs = require('fs');
        
            fs.readFile('formations.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
                
                this.sendSocketNotification('retour_des_formations', data);
                
            });
        }
        if (notification === 'demande_annee'){
            console.log("choix annee")
            console.log("lance voicecontrole pour annee")

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/ecouter.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python ecouter.py: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);
                if (stdout.includes("1") || stdout.includes("un")){
                    annee = "BAB1";
                }else if (stdout.includes("2") || stdout.includes("deux")){
                    annee = "BAB2";
                }else if (stdout.includes("3") || stdout.includes("trois")){
                    annee = "BAB3";
                }else if (stdout.includes("4") || stdout.includes("quatre")){
                    annee = "MA1";
                }else if (stdout.includes("5") || stdout.includes("cinq")){
                    annee = "MA2";
                }else{
                    this.sendSocketNotification('demande_annee', {redemander : true});
                }
            });

            const fs = require('fs');
        
            fs.readFile('formations.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const obj = JSON.parse(data);
                console.log(obj);
                let formations = obj[annee];
            });
                this.sendSocketNotification('retour_des_formations', formations);

        }

        if (notification === 'demande_formation'){
            console.log("choix formation")
            console.log("lance voicecontrole pour formation")

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/choix_formation.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                this.sendSocketNotification('CHOIX_FORMATION', stdout.trim());

            });
        }

        if (notification === 'demande_options'){
            console.log("choix options")
            console.log("lance voicecontrole pour formation")

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/choix_formation.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                this.sendSocketNotification('CHOIX_OPTIONS', stdout.trim());

            });
        }

        

        if (notification === 'validation_formation'){
            console.log("verification formation", payload)
            console.log("lance voicecontrole pour validation")

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/valider.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                
                console.log("La sortie est :", stdout);

                if (payload === "formation"){ 
                    this.sendSocketNotification('VALIDATION1', stdout.trim());
                }
                else {
                    this.sendSocketNotification('VALIDATION2', stdout.trim());
                }
            });
        }

        if (notification === 'STOP_VOICE_TEXT') {
            console.log("demande d'arret du contole vocal")

            // Définir un intervalle pour vérifier si le processus de contrôle vocal est en cours toutes les secondes
            let intervalId = setInterval(() => {
                if (this.voiceControlProcess) {
                    // Si un processus est en cours, le tuer
                    this.voiceControlProcess.kill('SIGINT');
                    console.log("Arrêt du contrôle vocal");

                    // Arrêter de vérifier
                    clearInterval(intervalId);
                }
            }, 1000); // 1000 millisecondes = 1 seconde

            // Arrêter de vérifier après 7 secondes, même si le processus de contrôle vocal n'a pas été trouvé
            setTimeout(() => {
                clearInterval(intervalId);
            }, 7000); // 7000 millisecondes = 7 secondes
        }
    },

});
