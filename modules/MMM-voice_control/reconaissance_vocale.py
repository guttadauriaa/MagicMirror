import speech_recognition as sr
import subprocess
import os
from fonctionnalite import Fonctionnalite

fonctionnalite = Fonctionnalite()

# Rediriger stderr vers /dev/null pour supprimer les erreurs ALSA
stderr_null = open(os.devnull, 'w')

def reconnaissance_vocale():
    # Créer un objet Recognizer
    recognizer = sr.Recognizer()

    while True:  # Boucle infinie pour une vérification constante
        # Utiliser le microphone comme source audio
        with sr.Microphone(device_index=3) as source:
            print("Dites quelque chose...")
            # Réduire le bruit de fond pour améliorer la reconnaissance
            recognizer.adjust_for_ambient_noise(source)
            
            # Enregistrer l'audio à partir du microphone
            audio = recognizer.listen(source)
            
            print("Analyse en cours...")
            try:
                # Reconnaître la parole en utilisant le modèle français
                texte = recognizer.recognize_google(audio, language="fr-FR")
                print("Vous avez dit :", texte)
                fonctionnalite.questions(texte)
            except sr.UnknownValueError:
                print("Je n'ai pas compris ce que vous avez dit.")
            except sr.RequestError as e:
                print("Erreur lors de la requête : ", e)

# Appeler la fonction reconnaissance_vocale avec redirection de stderr vers /dev/null
with stderr_null as devnull:
    reconnaissance_vocale()
