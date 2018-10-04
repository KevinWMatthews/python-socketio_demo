// This opens and connects the socketIO for you (though you can do this manually)
const socketIO = io('http://localhost:5000');

var logElement = document.getElementById('socketio_log');

function clearLog(logElement) {
    logElement.innerText = '';
}

function addToLog(logElement, text) {
    logElement.innerText = text;
}

//
// Connection events
//
socketIO.on('connect', function() {
    console.log('hi');
    addToLog(logElement, `Connected: ${socketIO.id}`);
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

//
// Message events
//
// 'message' is the default event for a SocketIO server's send() call.
socketIO.on('message', function(data) {
    addToLog(logElement, `Sent message: ${data}`);
});

// Custom event
socketIO.on('echo', function(data) {
    addToLog(logElement, `Sent message: ${data}`);
});

//
// Button handlers
//
var btn_send = document.getElementById('btn_send');
btn_send.addEventListener('click', function(event) {
    // Sends a 'message' event to the SocketIO server
    socketIO.send('Clicked the Send button.');
})

var btn_echo = document.getElementById('btn_echo');
btn_echo.addEventListener('click', function(event) {
    socketIO.emit('echo', 'Clicked the Echo button!');
});
