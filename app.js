var express    = require('express');
var path       = require('path');
var debug      = require('debug');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var app        = express();
var router = express.Router();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/boat');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
// app.use(expressLayouts);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(require('./controllers/boats'));

app.listen(3000);
console.log('Server has Awaken...');
