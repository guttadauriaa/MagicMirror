#!home/MirrorPyEnv/bin python3

import RPi.GPIO as GPIO

from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

# try:
#     text = input ('New data: ')
#     print("Now place your tag to write")
#     reader.write (text)
#     print ("Written" )

# finally:


try:
    id, text = reader.read()
    print(id, text)
    

finally:
    GPIO.cleanup()