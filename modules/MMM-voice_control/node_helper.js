const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    
    socketNotificationReceived: function(notification, payload) {

        // on va executer le script Python voice_control.py pour lancer le controle vocal
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
                
                console.log("[voice_control] La sortie est :", stdout);
            
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
                    console.log("redemander annee");
                    this.sendSocketNotification('demande_annee', {redemander : true});
                }
            });

            // const fs = require('fs').promises;
            // fs.readFile('./modules/MMM-voice_control/formations2.txt', 'utf8', (err, data) => {
            //     if (err) {
            //         console.error(err);
            //         return;
            //     }
            //     let obj = JSON.parse(data);
            //     console.log(obj.BAB1);
                
            //     this.sendSocketNotification('retour_des_formations', data);
            // });
            
            const fs = require('fs');
            fs.readFileSync('./modules/MMM-voice_control/formations2.txt', (err, data) => {
                if (err) {
                    console.error("Erreur de lecture du fichier JSON:", err);
                    return;
                }

                try {
                    let obj = JSON.parse(data);
                    let formations = obj.BAB1;
                    console.log(formations);
                    this.sendSocketNotification('retour_des_formations', formations);

                } catch (error) {
                    console.error("Erreur lors de l'analyse JSON:", error);
                }
            });
        }


        if (notification === 'demande_formation_old'){
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

        // if (notification === 'STOP_VOICE_TEXT') {
        //     console.log("demande d'arret du contole vocal")

        //     // Définir un intervalle pour vérifier si le processus de contrôle vocal est en cours toutes les secondes
        //     let intervalId = setInterval(() => {
        //         if (this.voiceControlProcess) {
        //             // Si un processus est en cours, le tuer
        //             this.voiceControlProcess.kill('SIGINT');
        //             console.log("Arrêt du contrôle vocal");
        //             this.sendSocketNotification('VOICE_TEXT_Stopped', {});
        //             // Arrêter de vérifier
        //             clearInterval(intervalId);
        //         }
        //     }, 1000); // 1000 millisecondes = 1 seconde

        //     // Arrêter de vérifier après 7 secondes, même si le processus de contrôle vocal n'a pas été trouvé
        //     setTimeout(() => {
        //         clearInterval(intervalId);
        //     }, 7000); // 7000 millisecondes = 7 secondes
        // }
    },

});
