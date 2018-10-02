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

# 'message' is the default event for a SocketIO client's send() call.
@sio.on('message')
def message(sid, data):
    print('message:', data)

@sio.on('custom_event')
def custom_event(sid, data):
    print('custom_event:', data)

@sio.on('echo')
def echo(sid, data):
    print('echo:', data)
    sio.emit('echo', data)

if __name__ == '__main__':
    application = socketio.Middleware(sio)
    listener = eventlet.listen((SERVER_HOSTNAME, SERVER_PORT))
    eventlet.wsgi.server(listener, application)
