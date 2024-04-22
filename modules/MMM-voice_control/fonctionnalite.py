class Fonctionnalite:
    def questions(self, data):

        liste_local = ["Auditoire 03", "Auditoire 05" ,"IGlab" ,"Auditoire 12" ,
                       "Auditoire 11" ,"Labo physique",
                       "Auditoire 21" ,"Auditoire 22" ,"Auditoire 23" ,"Auditoire 24" ,"Auditoire 25"]

        liste_test = ["auditoire trois", "auditoire cinq", "ig lab", "auditoire douze", 
                      "auditoire onze", "labo physique", "auditoire vingt-quatre", 
                      "auditoire vingt et un", "auditoire vingt-deux", "auditoire vingt-trois", "auditoire vingt-cinq"]
        
        if any(x in data for x in liste_test):
            print("ok")

        elif data.find('auditoire') >= 0 or data.find('local') >= 0:
            print("dans quel local souhaitez vous aller ? ")
            for i in liste_local:
                print(i)


        
        #guide moi vers un locale == > vers quel local