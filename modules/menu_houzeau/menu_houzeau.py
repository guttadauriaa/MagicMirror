#!home/MirrorPyEnv/bin python3

import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time 
from pdf2image import convert_from_path
import os


#pour interagir avec le site web 
service = Service(executable_path = "/usr/lib/chromium-browser/chromedriver")
driver = webdriver.Chrome(service = service)

# Charger la page Web
url = "https://www.calameo.com/read/000265915972f1317661b?trackersource=library"
driver.get(url)

# Attendre que la page se charge complètement
edit_button = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[@id=\"CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll\"]"))
)
edit_button.click()

menu = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "/html/body/div/div[2]/div/div[1]/div/div[1]/div/div[1]/div/div/a"))
)

#le lien vers le pdf du menu : menu.get_attribute("href")  https://www.calameo.com/read/000265915972f1317661b?trackersource=library
#si le lien est tjrs le meme de semaine en semaine on peut directement commencer ici
url_menu = menu.get_attribute("href")
driver.get(url_menu)

""" # Attendre que la page se charge complètement
edit_button = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[@id=\"CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll\"]"))
)
edit_button.click() """

download_button = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[3]/div[9]/div[2]/div[7]/button"))
)
download_button.click()
time.sleep(2)
driver.quit() 

#convertir le pdf en image

#Chemin vers le répertoire de téléchargement
download_dir = "/home/miroir/Téléchargements"

# Récupérer la liste des fichiers dans le répertoire
files = os.listdir(download_dir)

# Trier les fichiers par date de modification
files.sort(key=lambda x: os.path.getmtime(os.path.join(download_dir, x)))

# Le dernier fichier de la liste est le dernier fichier téléchargé
last_downloaded_file = files[-1]

# Chemin complet vers le dernier fichier téléchargé
pdf_path = os.path.join(download_dir, last_downloaded_file)

# Convertir le PDF en PNG
images = convert_from_path(pdf_path)

# Enregistrer les images
images[0].save(f"/home/miroir/MagicMirror/modules/menu_houzeau/menu.png", "PNG")
print(json.dumps(f"{last_downloaded_file} a été converti en image avec succès"))