Module.register("MMM-planning",{
  // Default module config.
  defaults: {
    text: "Hello World!"
  },

  //s'execute à l'initialisation du module
  start: function() {
    this.data = null;
    this.updateDom();  // Force une mise à jour de l'affichage
    this.sendSocketNotification('START', {});

  },

  //s'execute à chaque fois qu'il reçoit une notification
  socketNotificationReceived: function(notification, payload) {
    Log.info('MMM-planning received a socket notification: ' + notification + ' - Payload: ' + payload);
    if (notification === 'PYTHON_DATA') {
      this.data = payload;
      this.updateDom();
    }
  },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement("div");
    if (this.data) {
      // Si les données sont disponibles, affichez-les.
      wrapper.innerHTML = JSON.stringify(this.data);
    } else {
      // Sinon, affichez un message d'attente.
      wrapper.innerHTML = "Waiting for data...";
    }
    return wrapper;
  }
});