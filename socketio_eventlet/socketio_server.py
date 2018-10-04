# Serve content (here websockets) using eventlet.


import socketio
import eventlet

SERVER_HOSTNAME = ''
SERVER_PORT = 5000

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

# Custom event
@sio.on('echo')
def echo(sid, data):
    print('echo:', data)
    sio.emit('echo', data)

@sio.on('client_callback')
def client_callback(sid, data):
    print('client_callback:', data)
    # Return a tuple; these will be arguments in the client's callback
    return 'OK', 'Much wow'

def server_callback():
    # TODO: Not sure how to trigger this!
    print('In server callback')

@sio.on('request_server_callback')
def request_server_callback(sid, data):
    print('request_server_callback:', data)
    sio.emit('server_callback', 'Server is emitting an event with a callback', callback=server_callback)

if __name__ == '__main__':
    application = socketio.Middleware(sio)
    listener = eventlet.listen((SERVER_HOSTNAME, SERVER_PORT))
    eventlet.wsgi.server(listener, application)
