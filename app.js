const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fs = require('fs')  // NEW - this is required
const app = express()  // make express app
const http = require('http').Server(app)  // inject app into the server


// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view

// 2 manage our entries
// Node uses __dirname for the The directory name of the current module.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 set up the logger
// log HTTP requests to a file using the standard Apache combined format
// see https://github.com/expressjs/morgan for more
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

// 4 handle valid GET requests
app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
})
app.get("/index", function (req, res) {
  res.render("index.ejs")
})
// 4 http GET /tic-tac-toe
app.get("/testing", function (req, res) {
  res.render("testing.ejs")
})




// 4 http GET /contact
app.get("/contact", function (req, res) {
  res.render("contact.ejs")
})


// 5 handle valid POST request (not required to fully work)
app.post("/contact", function (req, res) {
  var api_key = '93fbedac0e9f5826b4154c694c695d5d-4836d8f5-79b431c8';
  var domain = 'sandbox08536bd1fe904f4489852e40f23275bf.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
  const name = req.body.firstname;
  const email = req.body.inputemail;
  const company = req.body.inputcompany;
  const comment = req.body.inputcomment;
  const isError = true;
  var data = {
    from: 'Excited User <postmaster@sandbox08536bd1fe904f4489852e40f23275bf.mailgun.org>',
    to: 'harithaatmakuri1105@gmail.com',
    subject: 'queries',
    text: name
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
    res.send('Your data has been stored')
    else{
      res.send('Bye!!')
    }
  });

  // 6 respond with 404 if a bad URI is requested
})
app.get(function (req, res) {
  res.render("404")
})

// Listen for an application request on port 8081
http.listen(process.env.PORT || 8081, function () {
  console.log('app listening on http://127.0.0.1:8081/')
})
