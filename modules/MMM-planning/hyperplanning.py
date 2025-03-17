#!home/miroir/MirrorPyEnv/bin/python3

from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
import json
from selenium.webdriver.firefox.options import Options
import sys

# L'année est requise pour l'url d'Hyperplanning
# Année - 1 si nous sommes en septembre ou plus tard
from datetime import date
today = date.today()
year = today.year
if today.month < 9:
    year = year - 1

NFCid= sys.argv[1]
horaire = [52, 5] #formation, option par defaut
nom_de_la_formation = ""

with open("./modules/MMM-planning/NFCtoH.txt", 'r') as f:
    for line in f:
        if NFCid in line:
            line = line.rstrip().split(" ")
            horaire[0] = int(line[1])
            horaire[1] = int(line[2])
            break
        


#pour exetuter le code à distance
from pyvirtualdisplay import Display
display = Display(visible=0, size=(800, 800))
display.start()

#pour ne pas afficher la fenêtre du navigateur
firefox_options = Options()
firefox_options.add_argument("--headless")
#firefox_options.add_argument('--shm-size=3g')

# paramètre pour les horaires   => exemple avec BAB3 ir civil IG à la semaine 25
#horaire = [52, 5] #formation, option
semaine = 28


#pour interagir avec le site web 
#il faut télécharger le firefoxdriver dispponible pour raspberry pi disponible sur internet au préalable. celui-ci à été stocker hors des fichier du projet
#à l'emplacement : /usr/lib/chromium-browser/firefoxdriver
service = Service(executable_path = "/usr/lib/firefox/geckodriver")

driver = webdriver.Firefox(service=service, options=firefox_options)

driver.get(f"https://hplanning{year}.umons.ac.be/invite")

#pour selectionner les bonnes options: 
#on parcours les cours et puis les options
for i, j in enumerate (horaire):

    #pour pouvoir choisir le cours/option voulu => on attend jusqu'à ce que la page soit chargée et on sélectionne
    edit_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[{i+1}].bouton_Edit"))
    )
    edit_button.click()

    test = 1
    while True:
        try:
            # Attendre que l'élément du cours soit présent sur la page
            course_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[{i+1}]_{j}"))
            )
            time.sleep(0.05)
            nom_de_la_formation += course_element.text+" - "
            course_element.click()
            break
        except Exception:
            # Si l'attente échoue, faire défiler la page jusqu'à un autre élément atteignable
            element = driver.find_element(By.ID, f"GInterface.Instances[1].Instances[{i+1}]_{10*test}")
            driver.execute_script("arguments[0].scrollIntoView();", element)
            test +=1

# # on choisit la semaine ==> ici on laisse la semaine par défaut donc on modifie pas
# button_semaine = WebDriverWait(driver, 5).until(
#         EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[3]_j_{semaine}"))
#     )
# button_semaine.click()

# on active l'option pour voir l'horaire complet
button_fullhoraire = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id=\"id_282\"]/div/div/i[5]"))
    )
button_fullhoraire.click()


#############
#on va maintenant parcourir tous les cours de la semaine ! 

#après avoir analyser la page web, le seul moyen de connaitre le jour correspondant au cours est 
#d'après sa position sur la page. on peut extraire cette caractéristique apd style dans l'attribut
#left. on va créer la tableau de correspondace des jours (on le définira une fois après avoir lu le premier cours
#pour connaitre la taille des cellules de cours.)

correspondance_jour ={}

numero = 0
liste_cours = list()
class Cours:
    def __init__(self, titre, local, jour, heure_debut, heure_fin):
        self.titre = titre
        self.local = local
        self.jour = jour.split(' ')[0]
        self.DateJour = jour.split(' ')[1]
        self.heure_debut = heure_debut
        self.heure_fin = heure_fin
    
    def to_dict(self):
        return {
            'Titre': self.titre,
            'Local': self.local,
            'Jour': self.jour,
            'DateJour' : self.DateJour,
            'HeureD': self.heure_debut,
            'HeureF': self.heure_fin
        }

#pour que la page soit bien chargée
time.sleep(2)

lecture = False
while True:
    try: 
        #cours = WebDriverWait(driver, 5).until(
        #    EC.presence_of_element_located((By.ID, f"id_42_cours_{numero}"))
        #)
        #print("numero", numero)
        cours = driver.find_element(By.ID, f"id_44_cours_{numero}")
        #print(cours.text)

        numero += 1

        style_value = cours.get_attribute("style")
        #print(style_value)

        #on utilise une expression régulière pour rechercher la valeur de l'attribut left
        match = re.search(r'left:\s*(-?\d+)px;', style_value)
        #print("match", match)

        #pour cree le tableau de correspondance des jours
        if not lecture:
            match2 = re.search(r'width:\s*(-?\d+)px;', style_value)
            #print("width", match2)
            #print("match2.group(1)", match2.group(1))

            positions = [-1, 173, 345, 515, 683, 849, 1013]
            for i in range (7):
                jour = driver.find_element(By.ID, f"id_41_titreTranche{i}").text
                #print("jour", jour)
                correspondance_jour[positions[i]] = jour

            # Fonction pour trouver la position la plus proche
            def trouve_position_proche(left_value, positions):
                return min(positions, key=lambda x: abs(x - left_value))

            lecture = True  # Pour éviter de recréer le dictionnaire à chaque itération

        left_value = int(match.group(1))
        position_proche = trouve_position_proche(left_value, positions)
        jour = correspondance_jour[position_proche]

        #on extrait les infos interressantes liées au cours sauf si le cours a été annulé

        local = list()
        if "ANNULÉ" not in cours.text:
            #print('pas annule')
            lignes = cours.text.splitlines()
            title = lignes[0]
            for ligne in lignes:
                if ligne[0] == ' ':
                    local.append(ligne.rstrip())
            heure_debut = lignes[-1]
            heure_fin = lignes[-2]

            #on va stocker les informations du cours dans une liste ou on explicite les valeurs suivantes:
            #nom du cours, local, date, heure début, heure fin, type de cours
            info = [title, local, jour, heure_debut, heure_fin]
            infoObj = Cours(title, local, jour, heure_debut, heure_fin)

            if infoObj.titre != "1":
                liste_cours.append(infoObj)

    except Exception as e:
        #print("Une exception de type", type(e).__name__, "a été levée.")
        if type(e).__name__ == 'NoSuchElementException':
            break
        #else:
            #print(e)
            #break 


listejson = [cours.to_dict() for cours in liste_cours]
data = {
    "cours": listejson,
    "Formation": nom_de_la_formation
}
print(json.dumps(data))



#time.sleep(5)
driver.quit()

# display.stop()

