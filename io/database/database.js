const pgp = require('pg-promise')()
const CONNECTION_STRING = "pg://melissamorel@localhost:5432/todo4"
const db = pgp( CONNECTION_STRING )

const getItems = () =>
  db.any( "SELECT * FROM items ORDER BY listOrder" )

module.exports = {getItems}
