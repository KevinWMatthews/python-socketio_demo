import socketio
from werkzeug.wrappers import Response
from werkzeug.serving import run_simple

SERVER_HOSTNAME = ''
SERVER_PORT = 5000

application = Response('Wiring check')

# The threading model is passed to the underlying communication protocol, EngineIO
sio = socketio.Server(async_mode='threading')
application = socketio.Middleware(sio, application)

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
    print('echo', data)
    pass

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple(SERVER_HOSTNAME, SERVER_PORT, application, use_debugger=True, use_reloader=True)
