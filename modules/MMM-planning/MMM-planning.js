Module.register("MMM-planning", {
    start: function() {
      this.data = null;
      this.NFCid = null;
      this.sendSocketNotification('START_NFC', {});
    },

    // //s'execute à chaque fois qu'il reçoit une notification
    // socketNotificationReceived: function(notification, payload) {
    //   Log.info('MMM-planning received a socket notification: ' + notification + ' - Payload: ' + payload);
    //   if (notification === 'Planning' && this.NFCid) {
    //     this.data = payload;
    //     //this.updateDom();
    //   }
    //   if (notification === 'NFC') {
    //     this.NFCid = payload;
    //     //this.updateDom();
    //   }
    // },

    // Override dom generator.
    getDom: function() {
      var wrapper = document.createElement("div");
      // if (this.data && this.NFCid ) {
      //   // Si les données sont disponibles, affichez-les.
      //   wrapper.innerHTML = this.data;
      // } else if (this.NFCid) {
      //   // Sinon, affichez un message d'attente.
      //   wrapper.innerHTML = "Waiting for data...";
      // } else {
      //   // Sinon, affichez un message d'attente.
      wrapper.innerHTML = "Scannez votre carte d'étudiant -> ";
      // }
      return wrapper;
    } 
});