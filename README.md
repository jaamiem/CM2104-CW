# CM2104-CW
# google maps api/places api

https://developers.google.com/maps/documentation/javascript/examples/directions-complex
# LOAD Database files
open the mongo shell in codio
write in use findspot_db
then exit the shell and enter the Coursework folder in codio over the terminal
now type in the following line
mongoimport --db findspot_db --collection users --drop --file users.json

after that check in mongo if the collection is there, then repeat the last step and do it for the locations

mongoimport --db findspot_db --collection locations --drop --file locations.json

# DeadLines Document
https://docs.google.com/document/d/17crN29vP91UqJ3RcyfgRz0Bf8P8KH_-w51CIAIipcjg/edit?usp=sharing

## how to run the application
go to the coursework folder in CM2104-CW (cd) in codio and type the following commands:

npm init (press enter repeatedly, if anyone has opinions about the licence, please bring them up)

npm install express --save (ignore warnings)

npm install ejs --save (ignore warnings again)

node app.js (this should run the server)

the installation steps are only needed once, after that run node app.js and it should work and
the application should now be running on your-codio-8080.codio.io

## Shortcut NPM Installation Commands
npm init > npm install
- Installs all dependancies included in package.json

npm i -s ejs express body-parser
- Installs all listed packages to local directory

npm i -g [Package]
- Installs package globally, used for Nodemon if using.

## Mongo Installation Link
https://www.mongodb.com/download-center#production
