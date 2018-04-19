
 const MongoClient = require('mongodb').MongoClient;
 const url = "mongodb://localhost:27017/user_inputed_location";

//  Include Express and set it to app
const express = require('express');
const ejs = require('ejs');

//added line for database since 'post' is used
const bodyParser = require('body-parser');
const app = express();
// for login database
const session = require('express-session');

const spots = [{
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
        lng: -2.101225
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
        lng: -2.101225
    }
]

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
    res.render( 'home', { title: 'Home', query: null, spots: spot } );
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
 });

app.post('/locations', function(req, res) {
    db.collection('locations').save(req.body, function(err, result) {
        if (err) throw err;
        console.log('location added to database')
        res.redirect('/')
     })
 })
// start of Get Routes

// this is the login route which renders the login.ejs page of our website
app.get('login', function(req, res){
	res.render('pages/login');
});

//start of Post Routes 


// the dologin route which takes data from our login page
// post variables, username and password
app.post('/dologin', function(req,res){
	console.log(JSON.stringfy(req.body))
	var username = req.body.username;
	var password = req.body.password;
	
	db.collection('users').findOne({"login.username" : username}, function(err,result){
		//if there is an error return, throw error
		if (err) throw err;
		//if there is no result, direct user back to login page. username does not exist then
		if (!result){res.redirect('/login'); return}
		//if ther is a result then check the passwor, if its correct set session loggedin to true
		// and send them to the home page
		if (result.login.password == password) {res.session.loggedin = true; res.redirect('/')}
		// if not send user back to login page
		else{res.redirect('/login')}
	});
});
