// This opens and connects the socket for you (though you can do this manually)
const socket = io('http://localhost:8000');

///
// Connection event
///
socket.on('connect', function() {                   // No event, it seems
    console.log('Connected:', socket.id);
    // Sends a 'message' event
    socket.send('Client SocketIO send');
    socket.emit('custom_event', 'Client SocketIO emit');
    socket.emit('echo', 'Echo!');
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
