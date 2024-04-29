# -*- coding: utf-8 -*-

import json


class Fonctionnalite:

    def questions(self, data):

        print(data)

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
