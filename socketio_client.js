// This opens and connects the socket for you (though you can do this manually)
const socket = io('http://localhost:8000');

///
// Connection event
///
socket.on('connect', function() {                   // No event, it seems
    console.log('Connected:', socket.id);
});
socket.on('connect_timeout', function(timeout) {    // Timeout value?
    console.log('Connect timeout:', timeout);
});
socket.on('connect_error', function(error) {        // error object
    console.log('Connect error:', error);
});

//
// Disconnect events
//
socket.on('disconnect', function(reason) {
    console.log('Disconnected:', reason);
    if (reason === 'io server disconnect') {
        // If the disconnect was initiated by the server,
        // the socket must be reconnected manually.
        socket.connect();
    }
    // else socketio automatically reconnects.
});

//
// Reconnect events
//
socket.on('reconnect', function(attemptNumber) {    // number
    console.log('Reconnected:', attemptNumber);
});
socket.on('reconnection', function(attemptNumber) {
    console.log('Reconnecting:', attemptNumber);
});
socket.on('reconnect_error', function(error) {      // error object
    console.log('Reconnect error:', error);
});
socket.on('reconnect_failed', function() {          // No argument
    console.log('Reconnect failed.');
});

//
// Custom events
//
var log_element = document.getElementById('socketio_log');

// 'message' is the default event for a SocketIO server's send() call.
socket.on('message', function(data) {
    console.log('Message:', data);
    log_element.innerText = data;
});

// Custom event
socket.on('echo', function(data) {
    console.log('Echo:', data);
    log_element.innerText = data;
});

// The server is waiting for the our response and
// will execute a callback when it receives our transmission.
socket.on('server_callback', function(data) {
    console.log('Not sure how to trigger the server callback');
    log_element.innerText = data;
});

//
// Button handlers
//
var btn_send = document.getElementById('btn_send');
btn_send.addEventListener('click', function(event) {
    // Sends a 'message' event to the SocketIO server
    socket.send('Clicked the Send button.');
})

var btn_echo = document.getElementById('btn_echo');
btn_echo.addEventListener('click', function(event) {
    socket.emit('echo', 'Clicked the Echo button!');
});

var btn_client_callback = document.getElementById('btn_client_callback');
btn_client_callback.addEventListener('click', function(event) {
    // Execute the callback when a response is received from the server.
    //
    // The data in the callback is the server's response:
    //  undefined if the server does not respond (even if the server receives the message)
    //  any number of arguments according to the server's response
    socket.emit('client_callback', 'Clicked the Client Callback button', function(arg1, arg2) {
        console.log('In emit(client_callback) ack:', arg1, arg2);
        log_element.innerText = arg1;
    });
    // socketio.send() has a callback, too.
});

var btn_request_server_callback = document.getElementById('btn_request_server_callback');
btn_request_server_callback.addEventListener('click', function(event) {
    // Send a message to the server - it is programmed to emit a message on this event.
    // The server will execute a callback when it receives our response to its message.
    socket.emit('request_server_callback', 'Clicked the Request Server Callback button');
});
