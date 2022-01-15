'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

var rooms = [
        { name: "room1", id: "1", messages: [{name:'Steven', message: 'Hello'}]},
        { name: "room2", id: "3", messages: [{name:'Steven', message: 'Hello'}, {name: 'Hasan', message: 'World'}]},
        { name: "room3", id: "7", messages: [{name:'Steven', message: 'Hello'}, {name: 'Hasan', message: 'World'}]},
        { name: "longlongname", id: "5", messages: [{name: 'longlongname', message: 'Extremely long message that necessitates a word wrap should go here. As I have some time I will write it myself.'}, {userName: 'Hasan', message: 'World'}]},
      ];

wss.on('connection', function (ws) {
  const id = setInterval(function () {
    ws.send(JSON.stringify({Type: "roomEvent", content: {name: "room1", message: {name: "Steven", message: "Hi"}}}), function () {
      //
      // Ignore errors.
      //
    });
  }, 10000);
  console.log('started client interval');

  ws.on('message', function message(data) {
  	var request = JSON.parse(data);
  	if(request.type == "chat"){
    	ws.send(JSON.stringify({
    		type: "chatMessage",
    		content: {
    			room: request.content.room,
    			message: {
    				message: request.content.message,
    				name: request.content.user.name
    			}
    		}
    	}));
    } else if(request.type == "joinRoom"){
    	ws.send(JSON.stringify({
    		type: "joinedRoom",
    		content: {
    			room: request.content.room
    		}
    	}));
    } else if(request.type == "createRoom"){
    	ws.send(JSON.stringify({
    		type: "newRoom",
    		content: {
    			room: {
    				id: "17",
    				name: request.content.room.name,
    				messages: []
    			}
    		}
    	}));
    	ws.send(JSON.stringify({
    		type: "joinedRoom",
    		content: {
    			room: {
    				id: "17",
    				name: request.content.room.name,
    				messages: []
    			}
    		}
    	}));
    } else if(request.type == "leaveRoom"){
    	ws.send(JSON.stringify({
    		type: "leftRoom",
    		content: {
    			room: request.content.room
    		}
    	}));
    } else if(request.type == "getRoom"){
    	ws.send(JSON.stringify({
    		type: "getRoom",
    		content: {
    			room: rooms.find(e => e.id == request.content.room.id)
    		}
    	}));
    } else if(request.type == "createUser"){
    	ws.send(JSON.stringify({
    		type: "userCreated",
    		content: {
    			user: {
		        	name: request.content.user.name,
		        	id: "1"
		      	}
    		}
    	}));
    } else if(request.type == "deleteUser"){
    	ws.send(JSON.stringify({
    		type: "userDeleted",
    		content: {
    			user: {
		        	name: request.content.user.name,
		        	id: request.content.user.id
		      	}
    		}
    	}));
    } else if(request.type == "getAvailableRooms"){
    	ws.send(JSON.stringify({
    		type: "availableRooms",
    		content: {
    			rooms: [
			        { name: "room1", id: "1"},
			        { name: "room2", id: "3"},
			        { name: "room3", id: "7"},
			        { name: "room4", id: "4"},
			        { name: "room5", id: "8"},
			        { name: "longlongname", id: "5"}
			    ],
    		}
    	}));
    }
  });

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});