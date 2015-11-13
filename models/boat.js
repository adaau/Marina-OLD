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

boatSchema.methods.showPhoto = function() {
  return '/img/' + this.photoUrl;
};

var Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;