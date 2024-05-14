# -*- coding: utf-8 -*-

import json

# class pour les fonctionnalités de l'assistant vocal 
class Fonctionnalite:

    # pour vérifier si l'utilisateur demande un guidage vers un local
    def questions(self, data):

        #test pour direction vers lacaux
        liste_local = [("Auditoire 3", "03"), ("Auditoire 5", "05"), ("Auditoire 11", "11"), ("Auditoire 12", "12"), 
                       ("Auditoire 21", "21"), ("Auditoire 22", "22"), ("Auditoire 23", "23"), ("Auditoire 24", "24"), ("Auditoire 25", "25"),    
                       ("Auditoire 25 bis", "25bis"), ("Auditoire 26", "26"), 
                       ("Labo physique", "lab_a"), ("Bibliothèque", "bibli"), ("Bureau doyenne", "doyen"),
                       ("IG lab", "ig_lab"), ("Réfectoire", "refectoire"), ("Salle archi", "pc_archi"), ("Salle des professeurs", "salle_des_profs"),
                       ("Secréteriat académique", "secretariat_academique"), ("Secrétariat des études", "secretariat_des_etudes"), ("Toilettes", "Toilettes")]
        
        #on test d'abors si l'utilisateur demande un guidage vers un local spécifique
        for local in liste_local:
            if local[0].lower() in data.lower():
                message = "très bien voici comment se rendre à : "+local[0]
                print(message)
                print(local[1])
                break

        #sinon on test si l'utilisateur demande un guidage vers un auditoire => on affiche la liste des auditoires
        else:
            if 'liste' in data or 'auditoire' in data or 'local' in data or 'locaux' in data:
                message = "Dans quel local souhaitez-vous aller ? "
                print(message, end="=")
                print("Secouez votre main au-dessus de l'heure pour réactiver le contrôle vocal", end="=")
                for local in liste_local:
                    if local[0] == "Toilettes":
                        print(local[0])
                    print(local[0], end="=")

            else: 
                print(data)

    def formation(self, data):
        for mot in data.split():
            try:
                if (mot.lower() == "annulé" or mot.lower() == "annuler" or mot.lower() == "stop"):
                    print("stop")
                    break

                num = int(mot)
                print(num)
                break
            
            except ValueError:
                continue
        else:
            print("false")

    def valide(self, data):
        if 'valider' in data or 'valide' in data or 'oui' in data:
            print("true")

        elif 'non' in data or 'annulé' in data or 'annuler' in data or 'stop' in data:
            print("false")

        else:
            print("not_ok")