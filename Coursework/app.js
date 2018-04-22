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

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// line for database
app.use(session({ secret: 'example'}));
app.use(bodyParser.urlencoded({extended: true}));

// Initial page, this is our root route
app.get('/', (req, res) => {
	//if the user is not logged in redirect them to the login page
	if(!req.session.loggedin) {
		res.redirect('/login');
		return;
	}
	
	//console.log(db.collection('locations').find({name: req.query.loc}).toArray());
	
	// If a location has been queried by the user, perform it and return the result to EJS,
	// else, render the home page without search results.
	if (req.query.loc !== "" && req.query.loc !== null && req.query.loc !== undefined) {
		var locations = db.collection('locations');
		
		// Use 'text' indexer to search database of locations
		locations.createIndex({name: 'text'}, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		
		// Search the locations collection using the user's string
		locations.find({$text: {$search: req.query.loc} }).toArray(function(err, result) {
			res.render( 'home', { title: 'Home', query: req.query.loc, spots: result });
		});
	} else {
		res.render( 'home', { title: 'Home', query: null, spots: [] });
	}
});

//  About Page
app.all('/about', (req, res) => {
	res.render( 'about', { title: 'About' } );
});

//  Help Page
app.all('/help', (req, res) => {
	res.render( 'help', { title: 'Help' });
});

//  Login Page
app.all('/login', (req, res) => {
	res.render( 'login', { title: 'Log in' });
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
app.get('/login', function(req, res){
	res.render('pages/login');
});

app.get('/add', function(req, res){
	res.render('add', {title: "Add Location"});
});

//start of Post Routes 

// db stuff for user_inputed_locations 
app.post('/locations', function(req, res) {
    db.collection('locations').save(req.body, function(err, result) {
        if (err) throw err;
        console.log('location added to database')
        res.redirect('/')
     })
 })

// the dologin route which takes data from our login page
// post variables, username and password
app.post('/dologin', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	
	db.collection('users').findOne({"login.username" : username}, function(err,result){
		//if there is an error return, throw error
		if (err) throw err;
		//if there is no result, direct user back to login page. username does not exist then
		if (!result){res.redirect('/login'); return}
		//if ther is a result then check the passwor, if its correct set session loggedin to true
		// and send them to the home page
		if (result.login.password == password) {req.session.loggedin = true; res.redirect('/')}
		// if not send user back to login page
		else{res.redirect('/login')}
	});
});
