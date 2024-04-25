Module.register("MMM-planning", {
    start: function() {
      this.data = 'datavide';
      console.log("Starting module: " + this.name + this.data);
      this.NFCid = '';
      this.sendSocketNotification('START_NFC', {});
    },
    
    
    //s'execute à chaque fois qu'il reçoit une notification
    socketNotificationReceived: function(notification, payload) {
      let wrapper = document.getElementById('MMM-planning');
      Log.info('MMM-planning received a socket notification: ' + notification + ' - Payload: ' + payload);
      if (notification === 'Planning' && this.NFCid !== '') {
        this.data = payload;
        // this.updateDom();
      }
      if (notification === 'NFC') {
        this.NFCid = payload;
        wrapper.innerHTML = "EN attente des données" + this.NFCid;
        // this.updateDom();
        console.log("maj dom",this.NFCid);
      }
    },

    getDom: function() {
      try {
          console.log("dom1");
          let wrapper = document.createElement("div");
          console.log("dom2");
          wrapper.id = "MMM-planning";
  
          wrapper.innerHTML = "Scannez votre carte d'étudiant -> ";
          return wrapper;
      } catch (error) {
          console.error("Erreur dans getDom: ", error);
      }
  }
});