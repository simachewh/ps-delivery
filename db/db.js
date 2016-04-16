/**
 * Created by Simachew on 15-Apr-16.
 */

/**
 * Bring mongoose module
 */
var mongoose = require("mongoose");

/**
 * Build connection string
 * @type {string}
 */
var connectionURI = "mongodb://localhost:27017/psdelivery";

mongoose.connect(connectionURI);

// HANDLE CONNECTION EVENTS
/**
 * Call back when successfully connected
 */
mongoose.connection.on("connected", function () {
    console.log("Mongoose connection open to " + connectionURI);
});

/**
 * On connection error occured.
 */
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error " + err);
});

/**
 * On connection is disconnected.
 */
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose connection disconnected");
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose connection disconnected on app termination");
        process.exist(0);
    });
});

//BRING IN SCHEMAS & MODELS ???