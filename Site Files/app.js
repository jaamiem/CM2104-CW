
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/user_inputed_location";

//  Include Express and set it to app
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser'); //added line for database since 'post' is used
const app = express();

var spots = {
		id: 1,
		name: "College Street Car Park",
		type: "lot",
		lat: 57.142736,
		lng: -2.099031
	}

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

//  Set an absolute path to scripts & images
app.use(express.static(path.join(__dirname + '/public')));

// line for database
app.use(bodyParser.urlencoded({extended: true}))

//  Initial page
app.get('/', (req, res) => {
    res.render( 'home', { title: 'Home', query: req.query.q, spots });
});

app.post('/', (req, res) => {
    res.render( 'home', { title: 'Home', query: null, spots } );
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
