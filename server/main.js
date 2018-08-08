import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// Create a MongoDB Collection
Gpsdata = new Mongo.Collection("gpsdata");

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

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
            //connection.sendUTF(message.utf8Data);
              tab = message.utf8Data.split(',');
              if (tab[2] === 'client1'){
                  console.log(tab[2]);
                  console.log('Latitude: ' + tab[0]); //console.log('Latitude: ' + message.utf8Data);
                  console.log('Longitude: ' + tab[1]);
              }
              /*if (tab[2] === 'client2'){
                  console.log(tab[2]);
                  console.log('Latitude: ' + tab[0]); //console.log('Latitude: ' + message.utf8Data);
                  console.log('Longitude: ' + tab[1]);
              }*/
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

            Meteor.methods({
            'insertGPSData': function(){
            Gpsdata.insert({
              Latitude: tab[0],
              Longitude: tab[1],
            });

           },
            'updatingGPSData': function(){
              // To change the values of a document without deleting it first, we need to use the $set operator.
              // This operator will change the value of specified fields.
              Gpsdata.update(Gpsdata.findOne({})._id,{$set: {Latitude: tab[0]}});
              Gpsdata.update(Gpsdata.findOne({})._id,{$set: {Longitude: tab[1]}});
            }
          });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

});
