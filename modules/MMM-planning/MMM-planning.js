Module.register("MMM-planning", {
  start: function() {
      this.NFCid = null;
      this.sendSocketNotification('START_NFC', {});
      console.log("Starting module: " + this.name);
  },

socketNotificationReceived: function(notification, payload) {
  function compareHeures(h1, h2){
    //renvoie -1 si h1 < h2 et h1 = h2, 1 si h1 > h2,
    let h1h = parseInt(h1.substring(0,2));
    let h1m = parseInt(h1.slice(-2));
    let h2h = parseInt(h2.substring(0,2));
    let h2m = parseInt(h2.slice(-2));
    if (h1h < h2h) {
        return -1;
    } else if (h1h > h2h) {
        return 1;
    } else {
        if (h1m < h2m) {
            return -1;
        } else if (h1m > h2m) {
            return 1;
        } else {
            return -1;
        }
    }
  }


  let wrapper = document.getElementById('MMM-planning');
  Log.info('MMM-planning received a socket notification: ' + notification);
  if (notification === 'Planning') {
    
    //wrapper.innerHTML = payload;
    let jours = [];
    let heures = ['08:15', '10:15', '10:30', '12:30', '13:30', '15:30', '15:45', '17:45', '18:00', '19:00'];
    let data = JSON.parse(payload);
    let liste_cours = {}; //liste pour trier les cours par jour et heure

    // Regrouper les cours par jour et par heure
    for (let coursKey in data) {
        let cours = data[coursKey];
        if (!liste_cours[cours.Jour]) {
            liste_cours[cours.Jour] = {};
            jours.push(cours.Jour);
        }
        liste_cours[cours.Jour][cours.HeureD] = cours;
    }
    console.log(liste_cours);
    //console.log(liste_cours['lun.']['08h15']);

    // Créer le tableau HTML
    let html = `<h>${this.NFCid}</h>`;
    html += `<table>`;
    html += '<tr><th>Heure</th>';
    for (let jour of jours) {
        html += `<th>${jour}</th>`;
    }
    html += '</tr>';

    for (let i = 0; i < heures.length-1; i++) {
        html += `<tr><td>${heures[i]}</td>`;
        for (let jour of jours) {
            for (let cours in liste_cours[jour]) {
                console.log(heures[i] + ' ' + iste_cours[jour][cours] + ' ' + heures[i+1])
                if (compareHeures(heures[i],cours.HeureD) === -1 && compareHeures(cours.HeureD,heures[i+1]) === -1) {
                    html += `<td>${cours.Titre}<br>Salle: ${cours.Local}</td>Heure de début: ${cours.HeureD}</td>Heure de fin: ${cours.HeureF}</td>`;
                    liste_cours.splice(cours.Jour,cours.HeureD);
                    break;
                } else {
                    html += '<td></td>';
                }
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