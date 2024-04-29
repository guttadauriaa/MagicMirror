const NodeHelper = require("node_helper");
const { exec } = require("child_process");


module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'KEYWORD') {

            console.log("lance keyword")
            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/mot_cle.py `, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    //return;
                }
            
                this.sendSocketNotification('KEYWORDRECEIVED', "Demandez moi ce que vous souhaitez")
            });
        }

        if (notification === 'VOICE_TEXT') {

            exec(`/home/miroir/MirrorPyEnv/bin/python3 ./modules/MMM-voice_control/voice_control.py `, (error, stdout, stderr) => {

                console.log("lance voicecontrole")
                if (error) {
                    console.error(`Erreur d'exécution du script Python: ${error}`);
                    return;
                }
                                // Chaîne de caractères renvoyée par le script Python
                var pythonOutput = stdout;

                // Décodage des caractères spéciaux
                var decodedOutput = JSON.parse('"' + pythonOutput + '"');

                // Conversion en texte lisible
                var readableText = decodeURIComponent(escape(decodedOutput));

                // Affichage du texte
                console.log(readableText); // Résultat : "à l'auditoire 12"



                console.log("La sortie stdout n'est pas vide :", stdout);
                this.sendSocketNotification('DISPLAY_TEXT', readableText);
            });
        }
    }
});
