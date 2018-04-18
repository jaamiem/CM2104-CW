
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/user_inputed_location";

//  Include Express and set it to app
const express = require('express');
const ejs = require('ejs');

//added line for database since 'post' is used
const bodyParser = require('body-parser')
const app = express();

var spots = [[57.142736,-2.099031], [57.144050,-2.101225], [57.142736,-3.099031], [57.144050,-3.101225]]

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
// line for database
app.use(bodyParser.urlencoded({extended: true}))

//  Initial page
app.get('/', (req, res) => {
    res.render( 'home', { title: 'Home', query: req.query.q, spots: spots });
});

app.post('/', (req, res) => {
    res.render( 'home', { title: 'Home', query: null, spots: spots } );
});

//  About Page
app.all('/about', (req, res) => {
	res.render( 'about', { title: 'About' } );
});

//  Help Page
app.all('/help', (req, res) => {
	res.render( 'help', { title: 'Help' });
});

app.listen(8080);

// var db;
//
// MongoClient.connect(url, function(err, database) {
//     if (err) throw err;
//     db = database;
//     app.listen(8080);
// });
//
// app.post('/locations', function(req, res) {
//     db.collection('locations').save(req.body, function(err, result) {
//         if (err) throw err;
//         console.log('location added to database')
//         res.redirect('/')
//     })
// })
