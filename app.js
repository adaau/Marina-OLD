var express         = require('express');
var mongoose        = require('mongoose');
var path            = require('path');
var debug           = require('debug');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var expressLayouts  = require('express-ejs-layouts');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');

var app     = express();
var router  = express.Router();
var port    = process.env.PORT || 3000;
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/boat';
mongoose.connect(mongoUri);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

app.use(session({ secret: 'MARINA'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', './views');
app.set('view engine', 'ejs');

app.engine('ejs', require('ejs').renderFile);

require('./config/passport')(passport);

app.use(function (req, res, next) {
  global.user = req.user;
  next()
});

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

var routes = require('./config/routes');
app.use(routes);

app.listen(process.env.PORT || 3000 );
console.log('Server has Awaken...');
