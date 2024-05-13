Module.register("inscription_NFC", {
  start: function() {
    //on ne peut mettre qu'une seule variable avec this ici, donc utilisation de l'objet userDetails
    this.userDetails = {
      NFCid: null,
      annee: null,
      formation: null,
      readytolisten: false
      // Ajoutez d'autres propriétés ici si nécessaire
    };
    console.log("Starting module: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    let wrapper = document.getElementById('inscription_NFC');
    console.log("inscription_NFC received a socket notification: " + notification);
    
    
    if (notification === 'retour_annee'){
      let redemander = false;
      // on verifie la réponse de l'utilisateur et on agit en fonction
      console.log("[demande_annee] La sortie est :", payload.sortie);
      if (payload.sortie.includes("1") || payload.sortie.includes("un")){
          annee = "BAB1";
      }else if (payload.sortie.includes("2") || payload.sortie.includes("deux")){
          console.log("2 ou deux trouvé");
          annee = "BAB2";
          console.log(annee);
      }else if (payload.sortie.includes("3") || payload.sortie.includes("trois")){
          annee = "BAB3";
      }else if (payload.sortie.includes("4") || payload.sortie.includes("quatre")){
          annee = "MA1";
      }else if (payload.sortie.includes("5") || payload.sortie.includes("cinq")){
          annee = "MA2";
      }else if (payload.sortie.includes("annuler")){
          console.log("annuler trouvé");
          this.hide();
      
      }else{
          console.log("redemander annee send");
          redemander = true;
          this.sendSocketNotification('ecouter', {suivant : 'retour_annee'});
        setTimeout(() => {
          let html = "<h1>Je n'ai pas compris, veuillez répéter.</h1>";
          html += `<h1> Dites le numéro de votre année d'étude ou "annuler" pour arrêter</h1>`;
          html += `<p>(1) BAB1<br>(2) BAB2<br>(3) BAB3<br>(4) MA1<br>(5) MA2</p>`;
          wrapper.innerHTML = html;
        }, 2000);
      }
      if (redemander === false){
        let html = `Vous avez choisi : ${annee}`;
        wrapper.innerHTML = html;
        this.userDetails.annee = annee; 
        this.sendSocketNotification('lecture_fichier_formations', {suivant : "retour_formation", annee : annee});
      }
    }

    if (notification === 'retour_des_formations'){
      let html = '';
      html = `<h1> Dites le numéro de votre formation pour l'année ${payload.annee} ou "annuler" pour arrêter</h1>`;
      for (let formation of payload.formations){
          html += `<p>(${formation.id}) ${formation.formation}<br></p>`;
      }
      
      wrapper.innerHTML = html;
      this.sendSocketNotification('demande_formation', {});
    }

    if (notification === 'retour_des_formations'){
      let html = `${payload}`;
      wrapper.innerHTML = html;
    }
  
  },
  notificationReceived: function(notification, payload) {
    let wrapper = document.getElementById('inscription_NFC');

    function waitUntilReady() {
      if (!this.userDetails.readytolisten) {
          setTimeout(() => {
              console.log("attente de arret voice control");
              wrapper.innerHTML = `<h1>(inscription) Attentez ${points} </h1>`;
              points += '.';
              waitUntilReady();
          }, 1000);
      }
    }
    

    // quand la notification depuis le module MMM-planning est "SETUP_BADGE", on lance l'enregistrement d'un nouvel utilisateur
    if (notification === 'SETUP_BADGE'){
      console.log(payload);

      //quand on a la valeur du nouveau badge à enregistrer
      this.userDetails.NFCid = payload.badge;
      this.show(); //affichage du module donc execution de resume() 
      console.log('inscription_NFC received a notification: ' + notification + ' with badge: ' + payload.badge);
      let points = '';
      // on envoie une notification au node_helper pour demander l'année d'étude de l'utilisateur
      waitUntilReady();

      this.sendSocketNotification('ecouter', {suivant : 'retour_annee'});
      setTimeout(() => {
        let html = `<h1> Dites le numéro de votre année d'étude ou "annuler" pour arrêter</h1>`;
        html += `<p>(1) BAB1<br>(2) BAB2<br>(3) BAB3<br>(4) MA1<br>(5) MA2</p>`;
        wrapper.innerHTML = html;
      }, 2000);
      
    }

    if (notification === 'VOICE_TEXT_Stopped'){
      console.log("[inscription_NFC] "+notification);
      this.userDetails.readytolisten = true;
    }
    
  },
  



  resume: function() {
    this.sendNotification("HIDE_VOICE_CONTROL", {});
    console.log("demande arret voice control")

  },
  suspend: function() {
    this.sendNotification("SHOW_VOICE_CONTROL", {});
    console.log("demande relancement voice control")
  },
  getDom: function() {
      
      let wrapper = document.createElement("div");
      wrapper.id = "inscription_NFC";
      wrapper.innerHTML = "<h1>Inscription nouvel utilisateur</h1>";
      return wrapper;
  }
});