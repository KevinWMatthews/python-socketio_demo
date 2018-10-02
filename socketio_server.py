import socketio
import eventlet

SERVER_HOSTNAME = ''
SERVER_PORT = 8000

sio = socketio.Server()

if __name__ == '__main__':
    application = socketio.Middleware(sio)
    listener = eventlet.listen((SERVER_HOSTNAME, SERVER_PORT))
    eventlet.wsgi.server(listener, application)
