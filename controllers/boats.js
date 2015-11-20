var Boat = require('../models/boat');

function home(req, res) {
  res.render('home');
}

// INDEX
function getBoats(req, res) {
  Boat.find({})
      .sort({ length: -1 })
      .exec(function(err, boats) {
        if (err) {
          res.json( {message: 'Could not find boat b/c: ' + err});
        }
        else {
          res.render('boats', {boats: boats});
        }
      });
}

// NEW
function newBoat(req, res) {
  Boat.find({}, function(err, boats) {
    res.render('boats/new', { boats: boats});
  });
}

// CREATE
function createBoat(req, res) {
  Boat.create(req.body.boat, function(err, boat) {
    if (err) {
      res.json( {message: 'Problem creating boat. ' + err});
    }
    else {
      res.redirect('/boats');
    }
  });
}

// SHOW
function getBoat(req, res) {
  var id = req.params.id;

  Boat.findById({_id: id}, function(err, boat) {
    if (err) {
      res.json( {message: 'Could not find boat b/c: ' + err});
    }
    else {
      res.render('boats/show', { boat: boat});
    }
  });
}

// UDPATE
function updateBoat(req, res) {
  Boat.findByIdAndUpdate(req.params.id, req.body.boat, function(err, boat) {
    if (err) {
      res.json( {message: 'Could not update boat b/c: ' + err} );
    }
    else {
      res.redirect('/boats');
    }
  });
}

// EDIT
function editBoat(req, res) {
  Boat.findById(req.params.id, function(err, boat) {
    res.render('boats/edit', { boat: boat});
  });
}

// DELETE
function removeBoat(req, res) {
  Boat.findByIdAndRemove(req.params.id, function(err, boat) {
    if (err) {
      res.json( {message: 'Could not delete boat b/c: ' + err});
    }
    else {
      res.redirect('/boats');
    }
  });
}

module.exports = {
  home:         home,
  getBoats:     getBoats,
  newBoat:      newBoat,
  createBoat:   createBoat,
  getBoat:      getBoat,
  editBoat:     editBoat,
  updateBoat:   updateBoat,
  removeBoat:   removeBoat
}
