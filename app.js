var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var app        = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/boat');

var Boat = require('./models/boat');

// var boat1 = new Boat({
//   name        : "Ghost",
//   type        : "Power Mega Yacht",
//   make        : "Ghost",
//   length      : 87,
//   capacity    : 30,
//   year        : 2008,
//   photoUrl    : "ghostElite.jpg"
// });

// boat1.save(function (err) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log('boat created');
//   }
// });

Boat.find( { }, function (err, boat) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(boat);
  }
});

