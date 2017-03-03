var express = require('express')
var router = express.Router()
var path = require('path')

const db = require('../database')

router.get('/', function(req, res, next) {
  //setting title variable
  db.getItems()
    .then(todos => {
      res.render('index', {
        todos
      })
    })
})

router.post('/api/todo', function(req, res) {
    const {
        item
    } = req.body
    if (item.length === 0) {
      console.log("cannot be blank")
        db.getItems().then(item => {res.redirect('/')
      })
    } else {
        db.addItems(item).then(() => res.redirect('/'))
    }
})

router.post('/api/todo/delete', function(request, response) {

    db.removeItems(request.body.todos)
    response.redirect('/')
})

router.post('/api/todo/edit',  function(request, response) {

  db.editTask(request.body.newToDo, request.body.id)
  response.redirect('/')
})

router.post( '/api/todo/:id', (request, response) => {
  const { id } = request.params
  const { completed } = request.body

  db.updateCompletion( id, completed )
    .then( result => response.json({ message: `${id} completed` }) )
})

module.exports = router
