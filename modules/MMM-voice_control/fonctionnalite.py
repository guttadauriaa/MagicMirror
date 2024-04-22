class Fonctionnalite:
    def questions(self, data):
        data = data
        print(data.find('ok'))


        if data.find('framboises') >= 0:
            print ("oui")

        if data.find('allume') >= 0 and data.find('rouge') >= 0:
            print("J allume la rouge")
            
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