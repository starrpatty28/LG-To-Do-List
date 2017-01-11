const express = require('express')
const path = require('path');
const router = express.Router()
const app = express()

//imported index route
const index = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//telling the server to use this route
app.use('/', index);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

module.exports = { app, router }
