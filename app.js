const express = require('express');
const socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function(){
    console.log('listening to request port 3000');
});

// Static File
app.use(express.static('public'));

// Socket Setup
var io = socket(server);
io.on('connection', function(socket){
    console.log('made socket connection',socket.id);
    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});