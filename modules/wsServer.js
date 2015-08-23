var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function startServer(port) {
  server.listen(port, function() {
      console.log((new Date()) + ' Server is listening on port ' + port);
  });
}
wsServer.startServer = startServer;

function getNewMessage(text) {
  return msg = {
    type: "message",
    text: text,
    id:   '',
    date: Date.now()
  };
}

function sendToAll(text) {
  var msgJSON = JSON.stringify(getNewMessage(text));
  console.log(wsServer);
  for(var i = 0; i < wsServer.connections.length; i++){
    wsServer.connections[i].sendUTF(msgJSON);
  }
}
wsServer.sendToAll = sendToAll;

// TODO: Add security : )
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            sendToAll(JSON.parse(message.utf8Data).text);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

module.exports = wsServer;
