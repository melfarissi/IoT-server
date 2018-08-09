/*jshint esversion: 6 */
import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
});

// Create a MongoDB Collection
Gpsdata = new Mongo.Collection("gpsdata");

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        tab = message.split(',');
          if (tab[2] == 'c3'){
              console.log('Client3 | latitude %s, longitude %s', tab[0], tab[1]);
          }
          if (tab[2] == 'c4'){
              console.log('Client4 | latitude %s, longitude %s', tab[0], tab[1]);
          }
  });

  ws.send('Connected');
});
