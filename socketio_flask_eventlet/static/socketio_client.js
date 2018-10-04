// This opens and connects the socketIO for you (though you can do this manually)
const socketIOUrl = 'http://localhost:5000';
const socketIO = io(socketIOUrl);

var logElement = document.getElementById('socketio_log');

function clearLog(logElement) {
    logElement.innerText = '';
}

function addToLog(logElement, text) {
    logElement.innerText += `${text}\n`;
}

//
// Connection events
//
socketIO.on('connect', function() {
    addToLog(logElement, `Connected: ${socketIO.id}`);
});
socketIO.on('connect_error', function(error) {
    addToLog(logElement, 'Connect error');
});
socketIO.on('connect_timeout', function(error) {        // error object
    addToLog(logElement, `Connect timeout: ${error}`);
});
socketIO.on('disconnect', function(reason) {
    addToLog(logElement, `Disconnected: ${reason}`);
    if (reason === 'io server disconnect') {
        socketIO.connect();
    }
});
socketIO.on('reconnect', function(attemptNumber) {
    addToLog(logElement, `Reconnected: ${attemptNumber}`);
});
socketIO.on('reconnect_failed', function() {
    addToLog('Reconnect failed');
});

//
// Message events
//
// 'message' is the default event for a SocketIO server's send() call.
socketIO.on('message', function(data) {
    addToLog(logElement, `Received message: ${data}`);
});

// Custom event
socketIO.on('echo', function(data) {
    addToLog(logElement, `Received echo: ${data}`);
});


//
// Button handlers
//
var btn_send = document.getElementById('btn_send');
btn_send.addEventListener('click', function(event) {
    // Sends a 'message' event to the SocketIO server
    let data = 'Clicked the Send button.';
    addToLog(logElement, data);
    socketIO.send(data);
})

var btn_echo = document.getElementById('btn_echo');
btn_echo.addEventListener('click', function(event) {
    let data = 'Clicked the Echo button!';
    addToLog(logElement, data);
    socketIO.emit('echo', data);
});

var btn_clear = document.getElementById('btn_clear');
btn_clear.addEventListener('click', function(event) {
    clearLog(logElement);
});

var btn_client_callback = document.getElementById('btn_client_callback');
btn_client_callback.addEventListener('click', function(event) {
    let data = 'Clicked the Client Callback button';
    socketIO.emit('client_callback', data, function(server_rsp1, server_rsp2) {
        addToLog(logElement, 'In client callback:');
        addToLog(server_rsp1);
        addToLog(server_rsp2);
    });
});


//
// Manipulate the DOM
//
window.onload = function() {
    addToLog(logElement, `Run the SocketIO server on ${socketIOUrl}`);
}
