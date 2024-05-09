Module.register("inscription_NFC", {
  start: function() {
      this.NFCid = null;
      console.log("Starting module: " + this.name);
  },

  notificationReceived: function(notification, payload) {
    if (notification === 'SETUP_BADGE'){
      this.NFCid = payload.badge;
      this.show();
      console.log('inscription_NFC received a notification: ' + notification + ' with payload: ' + payload.badge);
    }
  },

  resume: function() {
    this.sendNofiication("HIDE_VOICE_CONTROL", {});
    let wrapper = document.getElementById('inscription_NFC');

    html = `<h1> Dites le numéro de votre année d'étude ou "annuler" pour arrêter</h1>`;
            
    html += `<p>(1) BAB1<br>(2) BAB2<br>(3) BAB3<br>(4) MA1<br>(5) MA2</p>`;
    wrapper.innerHTML = html;
  },
  
  getDom: function() {
      console.log("dom1");
      let wrapper = document.createElement("div");
      wrapper.id = "inscription_NFC";
      wrapper.innerHTML = "<h1>Veuillez scanner votre carte étudiante -> </h1>";
      return wrapper;
  }
});