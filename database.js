const pgp = require('pg-promise')()
const CONNECTION_STRING = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : "pg://melissamorel@localhost:5432/todo4"

const db = pgp( CONNECTION_STRING )

const getListos = () =>
  db.any( "SELECT * FROM items ORDER BY id" )

const addItems = task =>
  db.oneOrNone( "INSERT INTO items (task) VALUES ($1)", [task]);

const removeItems = ids =>
  db.manyOrNone( "DELETE FROM items WHERE id IN ($1:csv)", [ids]);

const editTask = (newTask, id) =>
  db.oneOrNone( "UPDATE items SET task=$1 WHERE id=$2", [newTask, id]);

const updateCompletion = (id, completed) =>
  db.none( "UPDATE items SET complete=$2 WHERE id=$1", [ id, completed ])

module.exports = { getListos, addItems, removeItems, editTask, updateCompletion }
