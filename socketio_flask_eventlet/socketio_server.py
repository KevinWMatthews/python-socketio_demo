import socketio
from flask import Flask, render_template

SERVER_HOSTNAME = ''
SERVER_PORT = 5000

sio = socketio.Server(async_mode='threading')
app = Flask(__name__)
# Don't overwrite the Flask app variable! It does a lot of stuff for us.
app.wsgi_app = socketio.Middleware(sio, app.wsgi_app)

@app.route('/')
def index():
    """Serve the client-side application."""
    return render_template('socketio_client.html')

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
    return 'Server Response 1', 'Server Response 2'

if __name__ == '__main__':
    print('Do not run this script directly!')
    print('Instead, run using:')
    print('$ export FLASK_APP={}'.format(__file__))
    print('$ export FLASK_ENV=development')
    print('$ flask run')