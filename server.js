var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

var commands = [
	{command:'/setColor' , style:'color :', lengthOperation: 9},
	{command:'/setBold' , style:'font-weight: bold', lengthOperation:0}
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
		var messageWithoutCommand  = commandIndex != -1  ?  msg.substring(0,commandIndex) : msg;

		for (var i=0; i < commands.length; i++)
		{
			var currCommand = commands[i];
			var currCommandIndex = msg.indexOf(currCommand.command);


			if (currCommandIndex != -1)
			{
				var nextCommandIndex = msg.indexOf('/',currCommandIndex + 1) == -1 ? msg.length : msg.indexOf('/',currCommandIndex + 1);

				style += currCommand.style + msg.substring(currCommandIndex + currCommand.command.length,
													nextCommandIndex) + ';';
			}

		}

		socket.broadcast.emit('chat message', messageWithoutCommand, style);

	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});