import socketio
from werkzeug.wrappers import Response
from werkzeug.serving import run_simple

SERVER_HOSTNAME = ''
SERVER_PORT = 5000

application = Response('Wiring check')

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple(SERVER_HOSTNAME, SERVER_PORT, application, use_debugger=True, use_reloader=True)
