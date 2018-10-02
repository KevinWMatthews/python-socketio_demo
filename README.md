# Python SocketIO

Run a SocketIO server using Python's [SocketIO](https://python-socketio.readthedocs.io/en/stable/) module.


## Background

SocketIO is a revised WebSocket API. See a comparison [here](https://davidwalsh.name/websocket).
Python-SocketIO is a translation of the server-side SocketIO component from JavaScript into Python.
The [python-socketio](https://pypi.org/project/python-socketio/) module is *not* the same as the [socketio](https://pypi.org/project/socketio/) module!

Python-SocketIO is designed to be WSGI middleware.
It can sit between a WSGI server (such as `aiohttp` or `eventlet`) and
a WSGI application (such as `flask`) or it can be a WSGI application itself.

Be wary of the

##

## TODO

Run using aiohttp server.
Run under [gunicorn](http://docs.gunicorn.org/en/stable/index.html)
Run under [gevent](http://www.gevent.org/)
