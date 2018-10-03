import socketio
import wsgiref.simple_server

SERVER_HOSTNAME = ''
SERVER_PORT = 8000

# SocketIO (and the underlying EngineIO) can (does?) require threading.
# I don't know if they use it by default.
app = socketio.Server(async_mode='threading')

if __name__ == '__main__':
    # python-socketio's Server object doesn't seem to provide an HTTP server.
    # Use Python's built in example, wsgiref.simple_server.
    with wsgiref.simple_server.make_server(SERVER_HOSTNAME, SERVER_PORT, app) as httpd:
        print('Listening at:', httpd.server_address)
        httpd.serve_forever()
