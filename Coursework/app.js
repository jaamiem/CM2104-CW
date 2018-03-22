var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
  res.render(index);
});

app.get('/about', (req,res) => {
  res.send(about);
});

app.get('/help', (req,res) => {
  res.send(help);
});

app.listen(8080);
