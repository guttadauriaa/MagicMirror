import requests

class Fonctionnalite:
    def questions(self, data):

        liste_local = ["Auditoire 3", "Auditoire 5" ,"IG lab" ,"Auditoire 12" ,
                       "Auditoire 11" ,"Labo physique",
                       "Auditoire 21" ,"Auditoire 22" ,"Auditoire 23" ,"Auditoire 24" ,"Auditoire 25"]

        # liste_test = ["auditoire trois", "auditoire cinq", "ig lab", "auditoire douze", 
        #               "auditoire onze", "labo physique", "auditoire vingt-quatre", 
        #               "auditoire vingt et un", "auditoire vingt-deux", "auditoire vingt-trois", "auditoire vingt-cinq"]
        
       
        for local in liste_local:
            if local.lower() in data.lower():
                print("très bien voici comment se rendre à :", local)
                break

        else:
            if 'auditoire' in data or 'local' in data:
                print("Dans quel local souhaitez-vous aller ? ")
                for local in liste_local:
                    print(local)


        url = "http://localhost:8080/MMM-voice_control"
        payload = {"texte": data}
        requests.post(url, json=payload)

        #guide moi vers un locale == > vers quel local