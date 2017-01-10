var express = require('express')
var router = express.Router()
var path = require('path')

const db = require('../io/database/database')

router.get('/', function(req, res, next) {
  db.getItems()
    .then(todos => {
      res.render('index', {
        todos
      })
    })
})

module.exports = router
