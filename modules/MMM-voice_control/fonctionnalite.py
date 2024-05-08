# -*- coding: utf-8 -*-

import json


class Fonctionnalite:

    def questions(self, data):

        #test pour direction vers lacaux avec le nom du fichier
        liste_local = [("Auditoire 3", "03"), ("Auditoire 5", "05"), ("Auditoire 11", "11"), ("Auditoire 12", "12"), 
                       ("Auditoire 21", "21"), ("Auditoire 22", "22"), ("Auditoire 23", "23"), ("Auditoire 24", "24"), ("Auditoire 25", "25"),    
                       ("Auditoire 25 bis", "25bis"), ("Auditoire 26", "26"), 
                       ("Labo physique", "lab_a"), ("Bibliothèque", "bibli"), ("bureau doyenne", "doyen")
                       ("IG lab", "ig_lab"), ("Réfectoire", "refectoire"), ("Salle archi", "pc_archi"), ("salle des professeurs", "salle_des_profs"),
                       ("Secréteriat académique", "secretariat_academique"), ("Secrétariat des études", "secretariat_des_etudes"), ("Toilettes", "Toilettes")]
        
        for local in liste_local:
            if local[0].lower() in data.lower():
                message = "très bien voici comment se rendre à :" + local[0]
                print(f"{message}\n{local[1]}")
                break

        else:
            if 'auditoire' in data or 'local' in data:
                message = "Dans quel local souhaitez-vous aller ? "
                print(message)
                for local in liste_local:
                    print(local[0])

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