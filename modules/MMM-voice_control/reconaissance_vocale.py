import speech_recognition as sr

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

        try:
            print("Analyse en cours...")
            # Reconnaître la parole en utilisant le modèle français
            texte = recognizer.recognize_google(audio, language="fr-FR")
            print("Vous avez dit :", texte)
            return texte
        except sr.UnknownValueError:
            print("Je n'ai pas compris ce que vous avez dit.")
        except sr.RequestError as e:
            print("Erreur lors de la requête : ", e)

# Exemple d'utilisation
if __name__ == "__main__":
    while True:  # Boucle infinie pour une vérification constante
        texte_reconnu = reconnaissance_vocale()
        # Vous pouvez ajouter du code pour traiter la commande vocale ici
