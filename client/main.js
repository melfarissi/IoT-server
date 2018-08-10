import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Create a MongoDB Collection
Gpsdata = new Mongo.Collection("gpsdata");

// Inserting data before executing Gpsdata.find().fetch() instruction
Meteor.call('insertGPSData');


Template.PhidgetGPS.helpers({
  'data': function(){
      return Gpsdata.find().fetch();
  }
});

// 'updatingGPSData1' function is called each 3 seconds.
setInterval(function() {
  Meteor.call('updatingGPSData');
}, 3000);
