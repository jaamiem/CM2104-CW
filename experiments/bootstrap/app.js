//  Include Express and set it to app
var express = require('express');
var ejs = require('ejs');

var app = express();

const spots = [
	{
		id: 1,
		name: "College Street Car Park",
		type: "lot",
		lat: 57.142736,
		lng: -2.099031
	},
	{
		id: 2,
		name: "Crown Terrace",
		type: "street",
		lat: 57.144050,
		lng:-2.101225
	},
	{
		id: 3,
		name: "College Street Car Park",
		type: "lot",
		lat: 57.145636,
		lng: -2.099031
	},
	{
		id: 4,
		name: "Crown Terrace",
		type: "driveway",
		lat: 57.177050,
		lng:-2.101225
	}
]

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//  Initial page
app.get('/', (req, res) => {
	res.render('home', { title: 'Home', query: req.query.q, spots: spots });
});

app.post('/', (req, res) => {
	res.render('home', { title: 'Home', query: null, spots: spots });
});

//  About Page
app.get('/about', (req,res) => {
	res.render('about', { title: 'About' });
});

app.post('/about', (req,res) => {
	res.render('about', { title: 'About' });
});

//  Help Page
app.get('/help', (req,res) => {
	res.render('help', { title: 'Help' });
});

app.post('/help', (req,res) => {
	res.render('help', { title: 'Help' });
});

app.listen(8080);

// database stuff

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/user_inputed_location";
const express = require('express');
const app = express();

app.use(express.static('public'))
var db;

MongoClient.connect(url, function(err, database){
 if(err) throw err;
 	db = database;
	app.listen(8080);
});
