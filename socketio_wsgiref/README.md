# Python SocketIO with wsgiref

**NOTE** This doesn't yet work!
SocketIO events aren't going through after I refactored the JavaScript.
The wsgiref is having weird errors, and they seem to spawn subprocesses?
It requires Ctrl-C keypresses to exit everything.
Move to Werkzeug instead; it looks to have features that I'd like to explore.

While not performant, python-socketio's Socket.IO server can
be run using standard Python threads.
Serve using `simple_server` from python's built-in library `wsgiref`.

## Setup

Configure a virtual environment:
```
$ virtualenv --python=python3 venv
$ source venv/bin/activate
$ pip install --requirement requirements.txt
```
