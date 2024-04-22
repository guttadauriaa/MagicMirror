class Fonctionnalite:
    def questions(self, data):

        liste_local = ["Auditoire 03", "Auditoire 05" ,"IGlab" ,"Auditoire 12" ,
                       "Auditoire 11" ,"Labo physique A" ,"Labo physique B" ,"Labo physique C ",
                       "Auditoire 21" ,"Auditoire 22" ,"Auditoire 23" ,"Auditoire 24" ,"Auditoire 25"]

        if any(x in data for x in liste_local):
            print("ok")

        elif data.find('auditoire') >= 0 or data.find('local') >= 0:
            print("dans quel local souhaitez vous aller ? ")
            for i in liste_local:
                print(i)


        
        #guide moi vers un locale == > vers quel local