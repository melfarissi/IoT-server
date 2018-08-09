import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Create a MongoDB Collection for client1
Gpsdata = new Mongo.Collection("gpsdata");

// Create a MongoDB Collection for client2
//Gpsdata2 = new Mongo.Collection("gpsdata2");

// Inserting data before executing Gpsdata.find().fetch() instruction
Meteor.call('insertGPSData');

//Meteor.call('insertGPSData2');


Template.PhidgetGPS.helpers({
  'data': function(){
      return Gpsdata.find().fetch();
  }
});

/*Template.PhidgetGPS2.helpers({
  'data2': function(){
      return Gpsdata2.find().fetch();
  }
});*/

// 'updatingGPSData1' function is called each 3 seconds.
setInterval(function() {
  Meteor.call('updatingGPSData');
}, 3000);
