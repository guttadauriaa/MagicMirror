import nfc

def on_connect(tag):
    print("Tag NFC connecté !")
    print(tag)

def main():
    with nfc.ContactlessFrontend('usb') as clf:
        print("Attente d'un tag NFC...")
        clf.connect(rdwr={'on-connect': on_connect})

if __name__ == "__main__":
    main()
