# -*- coding: utf-8 -*-


import requests
import json


class Fonctionnalite:

    def questions(self, data):

        print(json.dumps(data))

        liste_local = ["Auditoire 3", "Auditoire 5" ,"IG lab" ,"Auditoire 12" ,
                       "Auditoire 11" ,"Labo physique",
                       "Auditoire 21" ,"Auditoire 22" ,"Auditoire 23" ,"Auditoire 24" ,"Auditoire 25"]

        for local in liste_local:
            if local.lower() in data.lower():
                print(json.dumps("très bien voici comment se rendre à :"), local)
                break

        else:
            if 'auditoire' in data or 'local' in data:
                print(json.dumps("Dans quel local souhaitez-vous aller ? "))
                for local in liste_local:
                    print(json.dumps(local))
