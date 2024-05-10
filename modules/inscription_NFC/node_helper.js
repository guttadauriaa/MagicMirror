const NodeHelper = require("node_helper");
const { exec } = require("child_process");
const { log } = require("console");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'demande_annee'){
            console.log("choix annee")
            console.log("lance voicecontrole pour annee")
            let redemander = false;
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/ecouter.py `, (error, stdout, stderr) => {

                if (error) {
                    console.error(`Erreur d'exécution du script Python ecouter.py: ${error}`);
                    return;
                }
                
                console.log("[demande_annee] La sortie est :", stdout);
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
                    redemander = true;
                    console.log("redemander annee");
                }
            });
            console.log(annee);
            if (redemander){
                this.sendSocketNotification('demander_annee', {});
            }
            
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
        
    }
});