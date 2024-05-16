#!home/miroir/MirrorPyEnv/bin/python3

from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options as FirefoxOptions
import re
import time
import json
import sys

if len(sys.argv) > 1:
    cours_id = sys.argv[1]
    #print(f"ID du cours : {cours_id}")
else:
    cours_id = 3  # Remplacez "default_value" par la valeur que vous voulez utiliser par défaut

#pour exetuter le code à distance
from pyvirtualdisplay import Display
display = Display(visible=0, size=(800, 800))
display.start()

#pour ne pas afficher la fenêtre du navigateur
firefox_options = FirefoxOptions()
firefox_options.add_argument("--headless")

# paramètre pour les horaires   => exemple avec BAB3 ir civil IG à la semaine 25
#horaire = [52, 5] #formation, option
semaine = 28

#pour interagir avec le site web 
#il faut télécharger le geckodriver disponible sur internet au préalable. celui-ci à été stocker hors des fichier du projet
#à l'emplacement : "/usr/lib/firefox/geckodriver"
service = Service(executable_path = "/usr/lib/firefox/geckodriver")

driver = webdriver.Firefox(service=service, options=firefox_options)

driver.get("https://hplanning2023.umons.ac.be/invite")

#pour selectionner les bonnes options: 
#on parcours les cours et puis les options

#pour pouvoir choisir le cours/option voulu => on attend jusqu'à ce que la page soit chargée et on sélectionne
edit_button = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[{1}].bouton_Edit"))
)
edit_button.click()


#slectionner le cours
test = 1
while True:
    try:
        # Attendre que l'élément du cours soit présent sur la page
        course_element = WebDriverWait(driver, 0.1).until(
            EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[{1}]_{cours_id}"))
        )
        course_element.click()
        break

    except Exception:
        # Si l'attente échoue, faire défiler la page jusqu'à un autre élément atteignable
        element = driver.find_element(By.ID, f"GInterface.Instances[1].Instances[{1}]_{10*test}")
        driver.execute_script("arguments[0].scrollIntoView();", element)
        test +=1

test = 1
options = []
i = 0

#selectionner l'option
while True:
    try:
        # Attendre que l'élément du cours soit présent sur la page
        course_element = WebDriverWait(driver, 0).until(
            EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[2]_{i}"))
        )
        options.append(course_element.text)
        i += 1

    except Exception:
        # Si l'attente échoue, faire défiler la page jusqu'à un autre élément atteignable
        try:
            element = driver.find_element(By.ID, f"GInterface.Instances[1].Instances[2]_{10*test}")
            driver.execute_script("arguments[0].scrollIntoView();", element)
            test +=1
        except Exception:
            # Si l'élément n'existe pas, arrêter la boucle
            break

# with open("formations.txt", "w") as f:
#     for i, j in enumerate(formation):
#         f.write(f"{i} {j}") 
#         print(f"{i} {j}")

#fonctionne pas tjrs vide
# for i in range(len(options)):
#     print(f"{i} {options[i]}") 


#pour tester
options2 = []
for i in range(len(options)):
    options2.append({'id': i, 'option': options[i]})

options = {'options' :{'id':0,'option':'IG'}}
print(json.dumps(options))

#time.sleep(5)
driver.quit()

# display.stop()