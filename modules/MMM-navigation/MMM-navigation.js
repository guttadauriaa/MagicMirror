Module.register("MMM-navigation", {
    imagePath: "./modules/MMM-navigation/map/23.png",

    start: function() {
        this.hide();
    },

    NotificationReceived: function(notification, payload, sender) {
        if (notification === "GUIDAGE") {
            console.log("Starting navigation");
            this.imagePath = `./modules/MMM-navigation/map/${payload}.png`;
            this.show();

            // Cachez le module après 60 secondes
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