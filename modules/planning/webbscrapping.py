from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time

# paramètre pour les horaires   => exemple avec BAB3 ir civil IG à la semaine 25
horaire = [52, 5] #formation, option
semaine = 25

#pour interagir avec le site web 
service = Service(executable_path = "chromedriver.exe")
driver = webdriver.Chrome(service = service)

driver.get("https://hplanning2023.umons.ac.be/invite")

#pour selectionner les bonnes options: 
#on parcours les cours et puis les options
for i, j in enumerate (horaire):

    #pour pouvoir choisir le cours/option voulu => on attend jusqu'à ce que la page soit chargée et on sélectionne
    edit_button = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[{i+1}].bouton_Edit"))
    )
    edit_button.click()

    test = 1
    while True:
        try:
            # Attendre que l'élément du cours soit présent sur la page
            course_element = WebDriverWait(driver, 0.1).until(
                EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[{i+1}]_{j}"))
            )
            course_element.click()
            break
        except Exception:
            # Si l'attente échoue, faire défiler la page jusqu'à un autre élément atteignable
            element = driver.find_element(By.ID, f"GInterface.Instances[1].Instances[{i+1}]_{10*test}")
            driver.execute_script("arguments[0].scrollIntoView();", element)
            test +=1

# on choisit la semaine
button_semaine = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[3]_j_{semaine}"))
    )
button_semaine.click()

# on active l'option pour voir l'horaire complet
button_fullhoraire = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id=\"id_262\"]/div/div/i[5]"))
    )
button_fullhoraire.click()


#############
#on va maintenant parcourir tous les cours de la semaine ! 

#après avoir analyser la page web, le seul moyen de connaitre le jour correspondant au cours est 
#d'après sa position sur la page. on peut extraire cette caractéristique apd style dans l'attribut
#left. on va créer la tableau de correspondace des jours

correspondance_jour ={}
for i in range (7):
    correspondance_jour[(-1+(i*169))] = driver.find_element(By.ID, f"id_39_titreTranche{i}").text

numero = 0
liste_cours = list()

#pour que la page soit bien chargée
time.sleep(1)

while True:
    try: 
        cours = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.ID, f"id_42_cours_{numero}"))
        )

        numero += 1

        style_value = cours.get_attribute("style")
        #print(style_value)

        #on utilise une expression régulière pour rechercher la valeur de l'attribut left
        match = re.search(r'left:\s*(-?\d+)px;', style_value)

        left_value = int(match.group(1))  #Récupérer la valeur de l'attribut left
        jour = correspondance_jour[left_value]


        #on extrait les infos interressantes liées au cours sauf si le cours a été annulé

        local = list()
        if "ANNULÉ" not in cours.text:
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
            liste_cours.append(info)

    except Exception as e:
        #plus de cours
        break

for cours in liste_cours:
    print(cours)

time.sleep(5)
driver.quit()