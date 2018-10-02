import socketio
import eventlet

SERVER_HOSTNAME = ''
SERVER_PORT = 8000

sio = socketio.Server()

@sio.on('connect')
def connect(sid, environ):
    print('connect:', sid)

@sio.on('disconnect')
def disconnect(sid):
    print('disconnect: ', sid)

if __name__ == '__main__':
    application = socketio.Middleware(sio)
    listener = eventlet.listen((SERVER_HOSTNAME, SERVER_PORT))
    eventlet.wsgi.server(listener, application)
