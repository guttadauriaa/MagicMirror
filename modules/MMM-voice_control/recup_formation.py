#!home/miroir/MirrorPyEnv/bin/python3

from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
import json
import sys

#pour exetuter le code à distance
from pyvirtualdisplay import Display
display = Display(visible=0, size=(800, 800))
display.start()

#pour ne pas afficher la fenêtre du navigateur
firefox_options = Options()
firefox_options.add_argument("--headless")

#pour interagir avec le site web 
#il faut télécharger le geckodriver disponible sur internet au préalable. celui-ci à été stocker hors des fichier du projet
#à l'emplacement : "/usr/lib/firefox/geckodriver"
service = Service(executable_path = "/usr/lib/firefox/geckodriver")

driver = webdriver.Firefox(service=service, options=firefox_options)


driver.get("https://hplanning2023.umons.ac.be/invite")

#on crée un tableau qui va stocker toutes les formations
formation = []


#pour pouvoir choisir le cours voulu => on attend jusqu'à ce que la page soit chargée et on sélectionne
edit_button = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[1].bouton_Edit"))
)
edit_button.click()

i = 0
test = 1

while True:
    try:
        # Attendre que l'élément du cours soit présent sur la page
        course_element = WebDriverWait(driver, 0).until(
            EC.presence_of_element_located((By.ID, f"GInterface.Instances[1].Instances[1]_{i}"))
        )
        formation.append(course_element.text)
        i += 1

    except Exception:
        # Si l'attente échoue, faire défiler la page jusqu'à un autre élément atteignable
        try:
            element = driver.find_element(By.ID, f"GInterface.Instances[1].Instances[1]_{10*test}")
            driver.execute_script("arguments[0].scrollIntoView();", element)
            test +=1
        except Exception:
            # Si l'élément n'existe pas, arrêter la boucle
            break


with open("formations.txt", "w") as f:
    for i, j in enumerate(formation):
        f.write(f"{i}:{j}\n") 
        print(f"{i}:{j}\n")
        
        
driver.quit()
