class Fonctionnalite:
    def questions(self, data):
        data = data
        print(data.find('ok'))


        if data.find('framboise') >= 0:
            print ("oui")

        if (data.find('guide') >= 0 or data.find('amène') >= 0) and data.find('local') >= 0:
            print("dans quel local souhaitez vous aller ? \n",
                  "Auditoire 03 \nAuditoire 05 \nIGlab \nAuditoire 12 \nAuditoire 11 \nLabo physique A \nLabo physique B \nLabo physique C ",
                  "\nAuditoire 21 \nAuditoire 22 \nAuditoire 23 \nAuditoire 24 \nAuditoire 25")
            
        if data.find('éteint') >= 0 and data.find('rouge') >= 0:
            print(") éteint la rouge")
            
        if data.find('allume') >= 0 and data.find('verte') >= 0:
            print("J allume la verte")
            
        if data.find('éteint') >= 0 and data.find('verte') >= 0:
            print("J éteint la verte")
            
        if data.find('allume') >= 0 and data.find('bleu') >= 0:
           print("J allume la bleu")
           
        if data.find('éteint') >= 0 and data.find('bleu') >= 0:
            print("J éteint la bleu")
            

        #guide moi vers un locale == > vers quel local