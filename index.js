var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
    socket.on('draw', function(coord){
        io.emit('remote draw', coord);
    });
    socket.on('erase', function(coord){
        io.emit('remote erase', coord);
    });
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});