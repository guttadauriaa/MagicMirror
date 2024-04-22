Module.register("test_module", {
    start: function() {
        this.sendSocketNotification('START_PYTHON_SCRIPT', {});
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'PYTHON_DATA') {
            let wrapper = document.getElementById('test_module');
            if (wrapper) {
                let jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
                let heures = ['8:15', '10:15', '10:30', '12:30', '14:00', '15:00', '16:00', '17:00', '18:00'];
                let data = JSON.parse(payload);
                let coursParJourEtHeure = {};

                // Regrouper les cours par jour et par heure
                for (let coursKey in data) {
                    let cours = data[coursKey];
                    if (!coursParJourEtHeure[cours.jour]) {
                        coursParJourEtHeure[cours.jour] = {};
                    }
                    coursParJourEtHeure[cours.jour][cours.heure_debut] = cours;
                    
                    
                }
                console.log(coursParJourEtHeure['Lundi']['8:15']);

                // Créer le tableau HTML
                let html = '<table>';
                html += '<tr><th>Heure</th>';
                for (let jour of jours) {
                    html += `<th>${jour}</th>`;
                }
                html += '</tr>';

                for (let heure of heures) {
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
        }
    },

    getDom: function() {
        let wrapper = document.createElement("div");
        wrapper.id = "test_module";
        wrapper.innerHTML = "Exécution du script Python, veuillez patienter...";
        return wrapper;
    }
});