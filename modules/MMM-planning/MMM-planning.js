Module.register("MMM-planning", {
  start: function() {
      this.NFCid = null;
      this.sendSocketNotification('START_PYTHON_SCRIPT', {});
      console.log("Starting module: " + this.name);
  },


  getDom: function() {
      console.log("dom1");
      let wrapper = document.createElement("div");
      wrapper.id = "MMM-planning";
      wrapper.innerHTML = "Exécution du script Python, veuillez patienter...";
      return wrapper;
  }
});