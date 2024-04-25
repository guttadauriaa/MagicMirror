Module.register("MMM-planning", {
  start: function() {
      this.NFCid = null;
      this.sendSocketNotification('START_NFC', {});
      console.log("Starting module: " + this.name);
  },

socketNotificationReceived: function(notification, payload) {
  let wrapper = document.getElementById('MMM-planning');
  Log.info('MMM-planning received a socket notification: ' + notification + ' - Payload: ' + payload);
  if (notification === 'Planning') {
    this.data = payload;
    // this.updateDom();
  }
  if (notification === 'NFC') {
    this.NFCid = payload;
    wrapper.innerHTML = "EN attente des données pour le badge" + this.NFCid;
    // this.updateDom();
    console.log("maj dom",this.NFCid);
  }
},

  getDom: function() {
      console.log("dom1");
      let wrapper = document.createElement("div");
      wrapper.id = "MMM-planning";
      wrapper.innerHTML = "Exécution du script Python, veuillez patienter...";
      return wrapper;
  }
});