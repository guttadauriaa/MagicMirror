#!home/miroir/MirrorPyEnv/bin/python3

import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time 
from pdf2image import convert_from_path
import os
from selenium.webdriver.chrome.options import Options
from datetime import date

with open("/home/miroir/MagicMirror/modules/menu_houzeau/menu.txt","r") as f:
    jourPre = int(f.readline())
    moisPre = int(f.readline())

today = date.today()
jourToday = today.day
moisToday = today.month
print(jourPre, moisPre, jourToday, moisToday)
if (jourPre < jourToday and moisPre == moisToday) or moisPre < moisToday:
    #charger un nouveau menu

    #pour ne pas afficher la fenêtre du navigateur
    from pyvirtualdisplay import Display
    display = Display(visible=0, size=(800, 800))
    display.start()

    #pour ne pas afficher la fenêtre du navigateur
    chrome_options = Options()
    chrome_options.add_argument("--headless")

    #pour interagir avec le site web 
    service = Service(executable_path = "/usr/lib/chromium-browser/chromedriver")

    #driver = webdriver.Chrome(service=service)
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Charger la page Web
    url = "https://www.calameo.com/read/000265915972f1317661b?trackersource=library"
    driver.get(url)

    # Attendre que la page se charge complètement
    edit_button = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id=\"CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll\"]"))
    )
    edit_button.click()

    # Attendre que le bouton de téléchargement soit visible
    download_button = WebDriverWait(driver, 30).until(
        EC.visibility_of_element_located((By.XPATH, '//*[@id="main-layout"]/div[9]/div[2]/div[7]/button'))
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

    jourfinsemaine = int(last_downloaded_file.split(' ')[-3])
    dicomois = {"janvier": 1, "février": 2, "mars": 3, "avril": 4, "mai": 5, "juin": 6, "juillet": 7, "août": 8, "septembre": 9, "octobre": 10, "novembre": 11, "décembre": 12}
    moisMenu = dicomois[last_downloaded_file.split(' ')[-2]]
    with open("./modules/menu_houzeau/menu.txt", "w") as f:
        f.write(f"{jourfinsemaine}\n{moisMenu}")