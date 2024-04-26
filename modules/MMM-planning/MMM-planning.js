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
  
    wrapper.innerHTML = payload;
  }
  if (notification === 'NFC') {
    this.NFCid = payload;
    wrapper.innerHTML = "En attente des données";
    this.sendSocketNotification('START_PLANNING', {NFCid : this.NFCid});
  }
},

  getDom: function() {
      console.log("dom1");
      let wrapper = document.createElement("div");
      wrapper.id = "MMM-planning";
      wrapper.innerHTML = "Veillez scanner votre carte étudiante ->";
      return wrapper;
  }
});