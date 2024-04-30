import json
import sys

NFCid= sys.argv[1]
test = False
with open("./modules/MMM-planning/NFCtoH.txt", 'r') as f:
    for line in f:
        if NFCid in line:
            test = True 
            break

print(json.dumps(f"test : {test}"))