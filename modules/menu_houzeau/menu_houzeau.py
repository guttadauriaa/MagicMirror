from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time 


#pour interagir avec le site web 
service = Service(executable_path = "/usr/lib/chromium-browser/chromedriver")
driver = webdriver.Chrome(service = service)

# Charger la page Web
url = "https://www.calameo.com/books/000265915b7f3033d8338"
driver.get(url)

# Attendre que la page se charge complètement
edit_button = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[@id=\"CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll\"]"))
)
edit_button.click()

menu = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "/html/body/div/div[2]/div/div[1]/div/div[1]/div/div[1]/div/div/a"))
)

#le lien vers le pdf du menu : menu.get_attribute("href")  https://www.calameo.com/read/000265915b7f3033d8338
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

