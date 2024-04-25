Module.register("MMM-planning", {
    start: function() {
      this.data = '';
      this.NFCid = '';
      this.sendSocketNotification('START_NFC', {});
    },

    //s'execute à chaque fois qu'il reçoit une notification
    socketNotificationReceived: function(notification, payload) {
      Log.info('MMM-planning received a socket notification: ' + notification + ' - Payload: ' + payload);
      if (notification === 'Planning' && this.NFCid !== '') {
        this.data = payload;
        //this.updateDom();
      }
      if (notification === 'NFC') {
        this.NFCid = payload;
        this.updateDom();
        console.log("maj dom",this.NFCid);
      }
    },

    // Override dom generator.
    getDom: function() {
      var wrapper = document.createElement("div");
      let html = '';
      if (this.NFCid === '') {
        wrapper.innerHTML = "Scannez votre carte d'étudiant -> ";
      } else if (this.data === '') {
        wrapper.innerHTML = "Waiting for data...";
      } else {
        //  html += this.data.toString(); 
        html += this.NFCid.toString();
      }

      wrapper.innerHTML = html;
      return wrapper;
    } 
});