import json
import sys
arg1= sys.argv[1]
arg2= sys.argv[2]

cours = {
    "cours1": {
        "nom": "Math",
        "prof": "Mme Dupont",
        "salle": "A101",
        "heure_debut": "8:15",
        "heure_fin": "10:15",
        "jour": "Lundi"
    },
    "cours2": {
        "nom": "Francais",
        "prof": "Mme Durand",
        "salle": "A102",
        "heure_debut": "10:30",
        "heure_fin": "12:30",
        "jour": "Mardi"
    },
}

print(json.dumps(cours))
