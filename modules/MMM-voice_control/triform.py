
import json


BAB1 = []
BAB2 = []
BAB3 = []
MA1 = []
MA2 = []

with open ('./modules/MMM-voice_control/formations_all.txt', 'r') as f :
    ligne = f.readline().rstrip().split(':')
    id = ligne[0]
    while ligne:
        if "BAB1" in ligne[1]:
            BAB1.append({'id': id, 'formation': ligne[1]})
        elif "BAB2" in ligne[1]:
            BAB2.append({'id': id, 'formation': ligne[1]})
        elif "BAB3" in ligne[1]:
            BAB3.append({'id': id, 'formation': ligne[1]})
        elif "MAB1" in ligne[1].upper():
            MA1.append({'id': id, 'formation': ligne[1]})
        elif "MAB2" in ligne[1].upper():
            MA2.append({'id': id, 'formation': ligne[1]})
        ligne = f.readline().rstrip().split(':')
        if ligne[0] != '':
            id = ligne[0]
        else:
            break
# Créer un dictionnaire global pour stocker tous les dictionnaires
data = {"BAB1": BAB1, "BAB2": BAB2, "BAB3": BAB3, "MA1": MA1, "MA2": MA2}

# Écrire les données dans un fichier JSON
with open('./modules/MMM-voice_control/formations.json', 'w') as f:
    json.dump(data, f)