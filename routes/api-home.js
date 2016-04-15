/**
 * Created by Simachew on 15-Apr-16.
 */
var express = require("express");
/**
 * Collect all sub routes under the API root route.
 */
var employeesRoute = require("./employees-route");

/**
 * Define home route, which is the API's root route.
 */
var apiHomeRoute = express.Router();
/**
 * The API home route, which will be registered on the app
 */
apiHomeRoute.get("/", function (request, response) {

    //return possible routes here, To get it closer to TRUE REST
    var welcomeClue = {
        intro: "Welcome to PS Equipment Delivery request service. ",
        tip: "Follow one of the routes to continue",
        routes: {},
        other: ":)"
    }
    response.json(welcomeClue);
}); //end of API home route definition.

/**
 * Register all routes under the API
 */
apiHomeRoute.use("/employees", employeesRoute);

/**
 * Export the home API route and its registered sub routes.
 */
module.exports = apiHomeRoute;
