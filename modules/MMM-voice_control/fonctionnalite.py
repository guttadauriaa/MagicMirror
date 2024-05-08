# -*- coding: utf-8 -*-

import json


class Fonctionnalite:

    def questions(self, data):

        #test pour direction vers lacaux
        liste_local = ["Auditoire 3", "Auditoire 5" ,"IG lab" ,"Auditoire 12" ,
                       "Auditoire 11" ,"Labo physique",
                       "Auditoire 21" ,"Auditoire 22" ,"Auditoire 23" ,"Auditoire 24" ,"Auditoire 25"]

        for local in liste_local:
            if local.lower() in data.lower():
                message = "très bien voici comment se rendre à :"
                print(message, local)
                break

        else:
            if 'auditoire' in data or 'local' in data:
                message = "Dans quel local souhaitez-vous aller ? "
                print(message)
                for local in liste_local:
                    print(local)

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