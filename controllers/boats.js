var express        = require ('express'),
    router        = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var Boat = require('../models/boat');

router.get('/boats', function(req, res) {
  Boat.find({}, function(err, boats) {
    res.render('boats/index', { boats: boats});
  });
});

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

module.exports = router;