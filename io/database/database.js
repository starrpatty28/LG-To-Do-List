const pgp = require('pg-promise')()
//environment variable
const CONNECTION_STRING = "pg://melissamorel@localhost:5432/todo4"
const db = pgp( CONNECTION_STRING )

const getItems = () =>
  db.any( "SELECT * FROM items ORDER BY listOrder" )

const addItems = task =>
  db.oneOrNone( "INSERT INTO items (task) VALUES ($1)", [task] )

module.exports = {getItems, addItems}
