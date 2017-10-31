var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

var commands = [
	{command:'/setColor' , style:'color :', lengthOperation: 6},
	{command:'/setBorder' , style:'border :', lengthOperation: 6}
];


app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/view/index.html');
});



io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg)
	{
		var style = '';
		var commandIndex = msg.indexOf('/');
		var action = commandIndex != -1  ?  commands[msg.string.replace(/  +/g, ' ').substring(" ",commandIndex)] : "";

		if(action != null)
		{

		}





		socket.broadcast.emit('chat message', msg);
		//io.emit('chat message', msg);
		//console.log('message: ' + msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});