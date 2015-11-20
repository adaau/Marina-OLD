var express         = require ('express'),
    router          = express.Router(),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    passport        = require('passport'),
    usersController = require('../controllers/users'),
    boatsController = require('../controllers/boats');

router.route('/')
  .get(boatsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route('/logout')
  .get(usersController.getLogout);

router.route('/boats')
  .get(boatsController.getBoats)
  .post(boatsController.createBoat);

router.route('/boats/new')
  .get(boatsController.newBoat);

router.route('/boats/:id')
  .get(boatsController.getBoat)
  .put(boatsController.updateBoat)
  .delete(boatsController.removeBoat);

router.route('/boats/:id/edit')
  .get(boatsController.editBoat);

// // EDIT
// router.get('/boats/:id/edit', function(req, res) {
//   Boat.findById(req.params.id, function(err, boat) {
//     res.render('boats/edit', { boat: boat});
//   });
// });

module.exports = router;
