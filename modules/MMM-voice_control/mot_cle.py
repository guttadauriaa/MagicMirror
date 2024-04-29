# -*- coding: utf-8 -*-


import speech_recognition as sr
import sys
import time
import threading

def enregistrer():
    # Créer un objet Recognizer
    recognizer = sr.Recognizer()

    while True:  # Boucle infinie pour une vérification constante
        # Utiliser le microphone comme source audio
        with sr.Microphone(device_index=3) as source:

            #print("Dites quelque chose...")
            # Réduire le bruit de fond pour améliorer la reconnaissance
            recognizer.adjust_for_ambient_noise(source)
            
            # Enregistrer l'audio à partir du microphone
            audio = recognizer.listen(source, timeout=2)

            #print("Analyse en cours...")
            try:
                # Reconnaître la parole en utilisant le modèle français
                texte = recognizer.recognize_google(audio, language="fr-FR")
                #print("Vous avez dit :", texte)
                
                if "miroir" in texte:
                    break


            except sr.UnknownValueError:
                print("Je n'ai pas compris ce que vous avez dit.")
                

            except sr.RequestError as e:
                print("Erreur lors de la requête : ", e)


# Création de deux threads
thread1 = threading.Thread(target=enregistrer)
thread2 = threading.Thread(target=enregistrer)

# Démarrage des threads
thread1.start()
time.sleep(1)
thread2.start()

while True:
    if not thread1 or not thread2:
        sys.exit()