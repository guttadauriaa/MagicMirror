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
    let jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    let heures = ['8:15', '10:15', '10:30', '12:30', '14:00', '15:00', '16:00', '17:00', '18:00'];
    let data = JSON.parse(payload);
    let coursParJourEtHeure = {};

    // Regrouper les cours par jour et par heure
    for (let coursKey in data) {
        let cours = data[coursKey];
        if (!coursParJourEtHeure[cours.Jour]) {
            coursParJourEtHeure[cours.Jour] = {};
            //remplir la liste de jour et heure ici
        }
        coursParJourEtHeure[cours.jour][cours.heure_debut] = cours;
        
        
    }
    console.log(coursParJourEtHeure['Lundi']['8:15']);

    // Créer le tableau HTML
    let html = `<h>${this.NFCid}</h>`;
    html += `<table>`;
    html += '<tr><th>Heure</th>';
    for (let jour of jours) {
        html += `<th>${jour}</th>`;
    }
    html += '</tr>';

    for (let i = 0; i < heures.length; i++) {
        html += `<tr><td>${heure}</td>`;
        for (let jour of jours) {
            
            if (coursParJourEtHeure[jour] && coursParJourEtHeure[jour][heure]) {
                let cours = coursParJourEtHeure[jour][heure];
                html += `<td>${cours.nom}<br>Professeur: ${cours.prof}<br>Salle: ${cours.salle}</td>`;
            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    wrapper.innerHTML = html;
  }
  if (notification === 'NFC') {
    this.NFCid = payload.substring(0, 12);
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