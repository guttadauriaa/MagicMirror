import sys

# permet de récupérer l'id du badge NFC
NFCid= sys.argv[1]
test = False

# permet de vérifier si l'id du badge NFC est présent dans le fichier NFCtoH.txt
with open("./modules/MMM-planning/NFCtoH.txt", 'r') as f:
    for line in f:
        if NFCid in line:
            test = True 
            break

# on sort le résultat de la vérification
print(test)