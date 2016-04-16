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

/**
 * Routes defined for this app in other files.
 */
var employeesRoute = require("./routes/employees-route");
var apiHome = require("./routes/api-home");

/** Initialize modules to use */
var app = express();

// set the port for our app
var port       = process.env.PORT || 1980;

// secret for creating tokens
var superSecret = 'ሰባት';

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
mongoose.connect("mongodb://localhost:27017/psdelivery");

/** Basic router for home, @host:port */
app.get("/", function (request, response) {
    var welcomeHome = {
        message: "welcome home",
        tip: "The only router to PS deliver is here",
        routes: {
            psAPIHome: "http://localhost:" + port + "/api.psdelivery"
        }
    }
    response.json(welcomeHome);
}); //end of basic router for howe

/** Register all routes to the app here*/
app.use("/api.psdelivery", apiHome);

/*Start the server and log the time of start with port.*/
app.listen(port);
require("util").log('PS delivery on port ' + port);