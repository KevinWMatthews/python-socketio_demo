# Use python's built-in WSGI http server, simple_server, and the standard library's threading.
# This simple example gives no provision for serving html pages.
# It simple forwards all traffic to the socketio app.
#
# Load the socketio client HTML and javascript in a browser manually.

import socketio
import wsgiref.simple_server

SERVER_HOSTNAME = ''
SERVER_PORT = 8000

# SocketIO (and the underlying EngineIO) can (does?) require threading.
# I don't know if they use it by default.
sio = socketio.Server(async_mode='threading')
app = socketio.Middleware(sio)

# SocketIO events
@sio.on('connect')
def connect(sid, environ):
    print('connect:', sid)

@sio.on('disconnect')
def disconnect(sid):
    print('disconnect:', sid)

@sio.on('message')
def message(sid, data):
    print('message:', data)

@sio.on('echo')
def echo(sid, data):
    pass

if __name__ == '__main__':
    # python-socketio's Server object doesn't seem to provide an HTTP server.
    # Use Python's built in example, wsgiref.simple_server.
    with wsgiref.simple_server.make_server(SERVER_HOSTNAME, SERVER_PORT, app) as httpd:
        print('Listening at:', httpd.server_address)
        httpd.serve_forever()
