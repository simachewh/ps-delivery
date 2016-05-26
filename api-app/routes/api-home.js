/**
 * Created by Simachew on 15-Apr-16.
 */

/**
 * Collect all modules.
 */
var express = require("express");
var jwt = require("jsonwebtoken");

/**
 * Collect all sub routes under the API root router
 * and other custom modules.
 */
var employeesRoute = require("./employees-routes");
var workPlaceRoutes = require("./workPlace-routes");

var config = require("../../config");

var Employee = require("../models/employee");
var jwt = require("jsonwebtoken");

var secretKey = config.secret;

module.exports = function (app, express) {


    /**
     * Define home router, which is the API's root router.
     */
    var apiHomeRoute = express.Router();
    
    /**
     * The API home router, which will be registered on the app
     */
    apiHomeRoute.get("/", function (request, response) {

        //return possible routes here, To get it closer to TRUE REST
        var welcomeClue = {
            intro: "Welcome to PS Equipment Delivery request service. ",
            tip: "Follow one of the routes to continue",
            routes: {
                //todo: do not hard core
                employees: "http://localhost:80/api.psdelivery/employees"
            },
            other: ":)"
        };
        response.json(welcomeClue);
    }); //end of API home router definition.

    /**
     * Route to authenticate Employees.
     */
    apiHomeRoute.post("/authenticate", function (req, res) {

        //find the employee
        Employee.findOne({userName: req.body.userName})
            .select("name userName password")
            .exec(function (err, employee) {
                if (err) {
                    //todo: better handle on error
                    throw err;
                }

                // Employee was not found
                if (!employee) {
                    res.json({
                        success: false,
                        message: "Authentication failed. User not found"
                    });
                } else if (employee) {
                    // Check if the password matches
                    var validPassowrd = employee.comparePassword(req.body.password);
                    // If password didn't match
                    if (!validPassowrd) {
                        console.log("Password: " + employee.password + " value: " + validPassowrd);
                        res.json({
                            success: false,
                            message: "Authentication failed. Wrong password or username"
                        });
                    }
                    // If user is found and password matches.
                    else {
                        // Create an access token
                        var token = jwt.sign(
                            {
                                name: employee.name,
                                userName: employee.userName
                            },
                            secretKey,
                            {
                                expiresIn: 86400 // expires in 24 hrs
                            }
                        );
                        // Return the token
                        res.json({
                            success: true,
                            token: token,
                            message: "Your Acess token"
                        });
                    }
                }
            });
    });

    /**
     * Route middle ware to verify a token
     */
    apiHomeRoute.use(function (req, res, next) {
        console.log("Somebody tried to access the API. Checking token");
        // Get token from header or url parameters or post parameters.
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // Verify secret and check expiriation.
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err){
                    return res.json({
                        success: false,
                        message: "Failed to authenticate token.",
                        error: err.message
                    });
                }
                else{
                    // If everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }

            });

        }
        // If no token provided
        else {
            // Return an HTTP response of 403 (access forbidden) and an error message
            return res.status(403).send({
                success: false,
                message: "No access token provided."
            });
        }

      //  next();
    });

    /**
     * Register all routes under the API
     */
    apiHomeRoute.use("/employees", employeesRoute);
    apiHomeRoute.use("/workplaces", workPlaceRoutes);

    return apiHomeRoute;

};

/**
 * Export the home API router and its registered sub routes.

 module.exports = apiHomeRoute;
 */