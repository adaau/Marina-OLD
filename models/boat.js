var mongoose = require('mongoose');

var boatSchema = new mongoose.Schema ({
  name        : String,
  type        : String,
  make        : String,
  length      : Number,
  capacity    : Number,
  year        : Number,
  photoUrl    : String
});

var Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;