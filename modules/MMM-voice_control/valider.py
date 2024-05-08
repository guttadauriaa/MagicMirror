# -*- coding: utf-8 -*-


import speech_recognition as sr
from fonctionnalite import Fonctionnalite

fonctionnalite = Fonctionnalite()

# Créer un objet Recognizer
recognizer = sr.Recognizer()

#while True:  # Boucle infinie pour une vérification constante
# Utiliser le microphone comme source audio
with sr.Microphone(device_index=3) as source:

    #print("Dites quelque chose...")
    # Réduire le bruit de fond pour améliorer la reconnaissance
    recognizer.adjust_for_ambient_noise(source)
    
    # Enregistrer l'audio à partir du microphone
    audio = recognizer.listen(source)
    
    #print("Analyse en cours...")
    try:
        # Reconnaître la parole en utilisant le modèle français
        texte = recognizer.recognize_google(audio, language="fr-FR")
        #print("Vous avez dit :", texte)
        fonctionnalite.valide(texte)

    except sr.UnknownValueError:
        print("not_ok")

    except sr.RequestError as e:
        print("Erreur lors de la requête : ", e)
