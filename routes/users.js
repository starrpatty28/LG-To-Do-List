var express = require('express');
var router = express.Router();
var path = require('path')

const db = require('../config/database')

/* GET users listing. */
router.get('/', function(request, response) {
  response.send('respond with a responseource');
});

router.get('/user1', function(request, response) {
  response.send('user 1 info lives here 3 ')
});

router.get('/', function(request, response) {
  response.render('index.ejs');
});

router.get('/login', function(request, response) {
  response.render('login.ejs', {message:'loginMessage'});
});

// process the login form
 router.post('/login')

router.get('/profile', isLoggedIn, function(request, response) {
  response.render('profile.ejs', {
    user : request.user
  });
});

router.get('/logout', function(request, respond) {
  request.logout();
  response.redirect('/');
});

//route middleware to make sure a user is logged in
function isLoggedIn(request, response, next) {
  if (request .isAuthenticated())
      return next();

  //if they aren't redirecte them to home page
  response.redirect('/');
}

module.exports = router;
