var express = require('express');
var app = express();
const items = require('./routes/Items');
const users = require('./routes/Users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/items/', items);
app.use('/users/', users);

app.get('/', function (req, res) {
  res.send('Welcome to Livshop - Yafit Lishitz\'s online shop');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
