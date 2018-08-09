/*jshint esversion: 6 */
import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup

});

// Create a MongoDB Collection for client1
Gpsdata = new Mongo.Collection("gpsdata");

// Create a MongoDB Collection for client2
//Gpsdata2 = new Mongo.Collection("gpsdata2");

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        tab = message.split(',');
          if (tab[2] == 'c1'){
              tab1 = [tab[0], tab[1]];
              console.log('Client1 | latitude %s, longitude %s', tab1[0], tab1[1]);
          }
          if (tab[2] == 'c2'){
              tab2 = [tab[0], tab[1]];
              console.log('Client2 | latitude %s, longitude %s', tab2[0], tab2[1]);
          }

  });

  ws.send('Connected');
});

  Meteor.methods({
      'insertGPSData': function(){
          Gpsdata.insert({
              Latitude1: tab1[0],
              Longitude1: tab1[1],
              Latitude2: tab2[0],
              Longitude2: tab2[1],
          });
          },
      'updatingGPSData': function(){
          // To change the values of a document without deleting it first, we need to use the $set operator.
          // This operator will change the value of specified fields.
          Gpsdata.update(Gpsdata.findOne({})._id,{$set: {Latitude1: tab1[0]}});
          Gpsdata.update(Gpsdata.findOne({})._id,{$set: {Longitude1: tab1[1]}});
          Gpsdata.update(Gpsdata.findOne({})._id,{$set: {Latitude2: tab2[0]}});
          Gpsdata.update(Gpsdata.findOne({})._id,{$set: {Longitude2: tab2[1]}});
        }/*,
      'insertGPSData2': function(){
          Gpsdata2.insert({
              Latitude: tab2[0],
              Longitude: tab2[1],
          });
        }*/
  });
