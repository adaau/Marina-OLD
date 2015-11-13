var express        = require ('express'),
    router        = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var Boat = require('../models/boat');

router.get('/', function(req, res) {
  res.render('home');
});

// INDEX
router.get('/boats', function(req, res) {
  Boat.find({}, function(err, boats) {
    res.render('boats/index', { boats: boats});
  });
});

// NEW
router.get('/boats/new', function(req, res) {
  Boat.find({}, function(err, boats) {
    res.render('boats/new', { boats: boats});
  });
});

// CREATE
router.post('/boats', function(req, res) {
  Boat.create(req.body.boat, function(err, boat) {
    if (err) {
      res.send("something wrong happened " + err);
    }
    else {
      res.redirect('/boats');
    }
  });
});

// SHOW
router.get('/boats/:id', function(req, res) {
  boat = Boat.findById(req.params.id);
  Boat.findById(req.params.id, function(err, boat) {
    res.render('boats/show', { boat: boat});
  });
});

// EDIT
router.get('/boats/:id/edit', function(req, res) {
  Boat.findById(req.params.id, function(err, boat) {
    res.render('boats/edit', { boat: boat});
  });
});

// UDPATE
router.put('/boats/:id', function(req, res) {
  Boat.findByIdAndUpdate(req.params.id, req.body.boat, function(err, boat) {
    if (err) {
      res.send("error " + err);
    }
    else {
      res.redirect('/boats');
    }
  });
});

// DELETE
router.post('/boats/:id/delete', function(req, res) {
  Boat.findByIdAndRemove(req.params.id, function(err, boat) {
    if (err) {
      res.send("error " + err);
    }
    else {
      res.redirect('/boats');
    }
  });
})

module.exports = router;
