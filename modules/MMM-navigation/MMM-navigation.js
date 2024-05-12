Module.register("MMM-navigation", {

    // on définit la varibale imagePath qui contiendra le chemin de l'image à afficher initialement vide
    imagePath: "",

    start: function() {
        // on cache par défaut le module
        this.hide();
    },

    notificationReceived: function(notification, payload, sender) {

        // quand la notification depuis le module MMM-voice_control est "GUIDAGE", on affiche l'image de la carte de navigation correpsondant au payload
        if (notification === "GUIDAGE") {
            console.log("Starting navigation");

            // on définit le chemin de l'image à afficher 
            this.imagePath = `./modules/MMM-navigation/map/${payload}.png`;
            // on affiche le module et on met à jour le DOM pour afficher l'image demandée
            this.show();
            this.updateDom();
            
            // on cache le module après 60 secondes pour ne pas surcharger l'affichage
            setTimeout(() => {
                this.hide();
            }, 60000);
        } else {
            this.hide();
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "MMM-navigation";
        let html = "";
        
        html += `<img src="${this.imagePath}" alt="Your Image" style="width: 100%; height: 100%;" />`;
        wrapper.innerHTML = html;
       
        return wrapper; 
    }
});