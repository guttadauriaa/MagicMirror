#!home/miroir/MirrorPyEnv/bin/python3

import argparse
import queue
import sys
import sounddevice as sd
import json
from fonctionnalite import Fonctionnalite
from vosk import Model, KaldiRecognizer

fonctionnalite = Fonctionnalite()

SILENCE_THRESHOLD = 0.01
DEFAULT_LANG_MODEL = "fr"

q = queue.Queue()

def int_or_str(text):
    """Helper function for argument parsing."""
    try:
        return int(text)
    except ValueError:
        return text

def callback(indata, frames, time, status):
    """This is called (from a separate thread) for each audio block."""
    if status:
        print(status, file=sys.stderr)
    q.put(bytes(indata))

def detect_speech(recognizer, data):
    """Detect speech activity."""
    if recognizer.AcceptWaveform(data):
        return True
    return False

def parse_arguments():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(description="Speech recognition from microphone")
    parser.add_argument("-f", "--filename", type=str, metavar="FILENAME", help="audio file to store recording to")
    parser.add_argument("-d", "--device", type=int_or_str, help="input device (numeric ID or substring)")
    parser.add_argument("-r", "--samplerate", type=int, help="sampling rate")
    parser.add_argument("-m", "--model", type=str, default=DEFAULT_LANG_MODEL, help="language model; e.g. en-us, fr, nl")
    return parser.parse_args()

parser = argparse.ArgumentParser(add_help=False)
parser.add_argument("-l", "--list-devices", action="store_true",help="show list of audio devices and exit")
args, remaining = parser.parse_known_args()

if args.list_devices:
    print(sd.query_devices())
    parser.exit(0)

parser = argparse.ArgumentParser(description=__doc__,formatter_class=argparse.RawDescriptionHelpFormatter,parents=[parser])
parser.add_argument("-f", "--filename", type=str, metavar="FILENAME",help="audio file to store recording to")
parser.add_argument("-d", "--device", type=int_or_str,help="input device (numeric ID or substring)")
parser.add_argument("-r", "--samplerate", type=int, help="sampling rate")
parser.add_argument("-m", "--model", type=str, help="language model; e.g. en-us, fr, nl; default is en-us")
args = parser.parse_args(remaining)

try:
    args = parse_arguments()
    model = Model(lang=args.model)

    with sd.RawInputStream(samplerate=args.samplerate, blocksize = 8000, device=args.device,dtype="int16", channels=1, callback=callback):
        print("#" * 80)
        print("Press Ctrl+C to stop the recording")
        print("#" * 80)


        recognizer = KaldiRecognizer(model, args.samplerate)
        recording = False
        
        #rec = KaldiRecognizer(model, args.samplerate)
        while True:
            data = q.get()

            # if rec.AcceptWaveform(data):
            #     parler = json.loads(rec.FinalResult())
            #     print (parler['text'])
            #     fonctionnalite.questions(parler['text'])

            # if dump_fn is not None:
            #     dump_fn.write(data)


            if not recording:
                if detect_speech(recognizer, data):
                    print("Recording started")
                    recording = True

            if recording:
                if detect_speech(recognizer, data):
                    spoken_text = json.loads(recognizer.FinalResult())['text']
                    fonctionnalite.questions(spoken_text)

                if args.filename:
                    with open(args.filename, "ab") as f:
                        f.write(data)

            if recording and not detect_speech(recognizer, data):
                print("Recording stopped")
                recording = False


except KeyboardInterrupt:
    print("\nDone")
    parser.exit(0)

except Exception as e:
    parser.exit(type(e).__name__ + ": " + str(e))
