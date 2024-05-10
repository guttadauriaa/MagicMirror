Module.register("inscription_NFC", {
  start: function() {
      this.NFCid = null;
      console.log("Starting module: " + this.name);
  },

  notificationReceived: function(notification, payload) {
    let wrapper = document.getElementById('inscription_NFC');

    if (notification === 'SETUP_BADGE'){
      console.log(payload);
      if (payload.redemander){
        console.log("redemander annee received");
        this.sendSocketNotification('demande_annee', {});
        setTimeout(() => {
          wrapper.innerHTML = "<h1>Je n'ai pas compris, veuillez répéter.</h1>";
        }, 2000);
      }else{
        this.NFCid = payload.badge;
        this.show();
        console.log('inscription_NFC received a notification: ' + notification + ' with badge: ' + payload.badge);
        
        this.sendSocketNotification('demande_annee', {});
        setTimeout(() => {
          let html = `<h1> Dites le numéro de votre année d'étude ou "annuler" pour arrêter</h1>`;
          html += `<p>(1) BAB1<br>(2) BAB2<br>(3) BAB3<br>(4) MA1<br>(5) MA2</p>`;
          wrapper.innerHTML = html;
        }, 2000);
      }
    }
    if (notification === 'retour_des_formations'){
      let html = `${payload}`;
      wrapper.innerHTML = html;
    }
  },


  resume: function() {
    this.sendNotification("HIDE_VOICE_CONTROL", {});
  },
  
  getDom: function() {
      
      let wrapper = document.createElement("div");
      wrapper.id = "inscription_NFC";
      wrapper.innerHTML = "<h1>Inscription nouvel utilisateur</h1>";
      return wrapper;
  }
});