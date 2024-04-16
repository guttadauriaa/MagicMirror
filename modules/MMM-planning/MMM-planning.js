Module.register("MMM-planning",{
  // Default module config.
  defaults: {
    text: "Hello World!"
  },

  // Ajoutez cette ligne pour initialiser la propriété data.
  data: null,

  start: function() {
    this.sendSocketNotification('START', {});
  },

  socketNotificationReceived: function(notification, payload) {
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