var express = require('express')
var router = express.Router()
var path = require('path')
const bodyParser = require('body-parser');

const db = require('../io/database/database')

router.get('/', function(req, res, next) {
  db.getItems()
    .then(todos => {
      res.render('index', {
        todos
      })
    })
})

router.post('/api/todo', (req, res, next) => {
  console.log("this is body", req.body)
  const results = [];
  const data = {text: req.body.text};
  db.addItems(data.text).then(() => res.redirect('/'))
})

module.exports = router
