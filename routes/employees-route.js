/**
 * Created by Simachew on 15-Apr-16.
 */

var express = require("express");
var route = express.Router();

route.get("/", function (request, response) {
    response.json({message: "List of Employees"});
})





module.exports = route;