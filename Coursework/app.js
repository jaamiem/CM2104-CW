// Include MongoDB and connect it to FindSpot's database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/findspot_db";

//  Include Express and set it to app
const express = require('express');
const ejs = require('ejs');

//added line for database since 'post' is used
const bodyParser = require('body-parser');
const app = express();
// for login database
const session = require('express-session');

function isLoggedIn(req) {
	return req.session.currentUser !== null && typeof req.session.currentUser !== 'undefined';
} 

//if the user is not logged in redirect them to the login page

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// line for database
app.use(session({ secret: 'example'}));
app.use(bodyParser.urlencoded({extended: true}));

// Initial page, this is our root route
app.get('/', (req, res) => {
	// Redirect to login page if not logged in, else load the page as normal.
	if (!isLoggedIn(req)) {
		res.redirect('/login');
	} else {
		//console.log(db.collection('locations').find({name: req.query.loc}).toArray());
	
		// If a location has been queried by the user, perform it and return the result to EJS,
		// else, render the home page without search results.
		if (req.query.loc !== "" && req.query.loc !== null && req.query.loc !== undefined) {
			var locations = db.collection('locations');
		
			// Use 'text' indexer to search database of locations
			locations.createIndex({name: 'text'}, function(err, result) {
				if (err) throw err;
				console.log("result: " + result);
			});
		
			// Search the locations collection using the user's string
			locations.find({"name": {"$regex" : "*" + req.query.loc + "*", "$options": "i"} }).toArray(function(err, result) {
				//console.log(result);
				res.render( 'home', { title: 'Home', query: req.query.loc, spots: result, user: req.session.currentUser });
			});
		} else {
			res.render( 'home', { title: 'Home', query: null, spots: [], user: req.session.currentUser });
		}
	}
});

//  About Page
app.all('/about', (req, res) => {
	res.render( 'about', { title: 'About', user: req.session.currentUser } );
});

//  Help Page
app.all('/help', (req, res) => {
	res.render( 'help', { title: 'Help', user: req.session.currentUser });
});

//  Login Page
app.all('/login', (req, res) => {
	res.render( 'login', { title: 'Log in', user: req.session.currentUser });
});



 var db;

 MongoClient.connect(url, function(err, database) {
     if (err) throw err;
    db = database;
     app.listen(8080);
	 console.log('listening on 8080');
 });

 // start of Get Routes

// this is the login route which renders the login.ejs page of our website

app.get('/add', function(req, res){
	if (isLoggedIn(req)) {
		res.render('add', {title: "Add Location", user: req.session.currentUser});
	} else {
		res.redirect('/login');
	}
});

//start of Post Routes 

// db stuff for user_inputed_locations 
app.post('/locations', function(req, res) {
    if (isLoggedIn(req)) {
		var newLocation = {
			name: req.body.name,
			type: req.body.type,
			lat: parseFloat(req.body.lat),
			long: parseFloat(req.body.long),
			price: req.body.price
		};
		
		console.log(req.body.lat);
		
		db.collection('locations').save(newLocation, function(err, result) {
			if (err) throw err;
			//console.log('location added to database')
			res.redirect('/')
		 });
	 } else {
		 res.redirect('/login');
	 }
 });

// the dologin route which takes data from our login page
// post variables, username and password
app.post('/dologin', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	
	db.collection('users').findOne({"login.username" : username}, function(err,result) {
		//if there is an error return, throw error
		if (err) throw err;
		//if there is no result, direct user back to login page. username does not exist then
		if (!result) {
			res.redirect('/login');
			return;
		}
		
		// if there is a result then check the password, if its correct set session loggedin to true
		// and send them to the home page, else send user back to login page
		if (result.login.password == password) {
			req.session.currentUser = username;
			res.redirect('/');
		} else {
			res.redirect('/login');
		}
	});
});

app.all('/dologout', function(req,res) {
	req.session.currentUser = null;
	res.redirect('/login');
});
