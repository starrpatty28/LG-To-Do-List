var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg')
var pgp = require('pg-promise')();
var port = process.env.PORT || 8080;
var passport = require('passport');
var morgan = require('morgan');
var session = require('express-session');

var configDB = require('./config/database');

// /*var conString = "pg://melissamorel@localhost:5432/todo4";
// var client = new pg.Client(conString);
// client.connect();*/

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// require('/config/passport')(passport); //pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//set up the express application
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParcer());
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); //session secet
app.use(passport.initialize());
app.use(passport.session());

app.listen(port);
console.log('The magic happens on port ' + port);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
//require('./app.js')(app, passport);
