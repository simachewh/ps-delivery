/**
 * Created by Simachew on 15-Apr-16.
 */

/**
 * Collect modules.
 */
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var path = require("path");


/**
 * Routes defined for this app in other files.
 */
var employeesRoute = require("./api-app/routes/employees-routes");
var config = require("./config");

/** Initialize modules to use */
var app = express();

// set the port for our app
var port = config.port;

// secret for creating tokens
var superSecret = config.secret;


// App Configuration
// body parser used to grab from POST content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handling CORS (cross-origin resource sharing) requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization');
    next();
});

/** log all requests to the console */
app.use(morgan('dev'));

/**Connect to the database. Connection option should at least include
 * reconnect option and keep alive
 * todo : add option to mongodb connection*/
mongoose.connect(config.database);

/**
 * Set static files location
 * used for requests that our frontend will make.
 * todo: CHECK, this might be where I tell the api where frontend
 * request come from. Say for example if I want to put the frontend
 * on another server.
 */
app.use(express.static(__dirname + '/public'));

var apiHome = require("./api-app/routes/api-home")(app, express);

/** Basic router for home, @host:port */
/*app.get("/", function (request, response) {
 var welcomeHome = {
 message: "welcome home, from server.js",
 tip: "The only router to PS deliver is here",
 routes: {
 psAPIHome: "http://localhost:" + port + "/api.psdelivery"
 }
 };
 response.json(welcomeHome);
 }); //end of basic router for home*/

/** Register all routes to the app here*/
app.use("/api.psdelivery", apiHome);

/** Catch call. Redirect all unregistered URLs such as
 * /api.psdelivery/* to frontend
 * todo: check if why this implementation is not working**/
app.get("*", function (req, res) {
    console.log("hit url catch call * " + __dirname +
        "/public/app/views/index.html");
    console.log("Req URL: " + req.url);
    res.sendFile(path.join(__dirname +
    "\\public\\app\\views\\index.html"));
});

/*Start the server and log the time of start with port.*/
app.listen(port);
require("util").log('PS delivery on port ' + port);