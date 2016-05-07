/**
 * Created by Simachew on 06-May-16.
 */

var baseUrl = "/api.psdelivery";
var authUrl = "/authenticate/";

angular.module("authService", [])

    /**
     * ===================================================
     * auth factory to login and get information
     * inject $http for communicating with the API
     * inject $q to return promise objects
     * inject AuthToken to manage tokens
     * ===================================================
     */
    .factory("Auth", function ($http, $q, AuthToken) {

        // create auth factory object
        var authFactory = {};

        /**
         * Function to log a employee in and assign it a token.
         * @param userName
         * @param password
         * @returns {*}
         */
        authFactory.login = function (userName, password) {

            // return the promise object and its data
            return $http.post(baseUrl + authUrl, {
                    userName: userName,
                    password: password
                })
                .success(function (data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        /**
         * Logout function to log an employee out by clearing the token.
         */
        authFactory.logout = function () {
            // clear the token
            AuthToken.setToken();
        };

        /**
         * Functin to Check if an employee is logged in and
         * checks if there is a local token.
         * @returns {boolean}
         */
        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken()){
                return true;
            }
            else {
                return false;
            }
        };

        /**
         * Function to get the logged employee.
         * @returns {*}
         */
        authFactory.getEmployee = function () {
            if (AuthToken.getToken()) {
                // the cache: true is here so if employee data is
                // already in cache it avoids requesting the server.
                return $http.get(baseUrl + "/me", {cache: true});
            }
            else {
                return $q.reject({message: "Employee has no token."});
            }
        };

        /**
         * Function to create a sample employee for demo purposes.
         */
        authFactory.createSampleEmployee = function () {
            $http.post(baseUrl + "/sample");
        };

        // return auth factory object
        return authFactory;

    })


    /**
     * ===================================================
     * factory for handling tokens
     * inject $window to store token on the client-side
     * ===================================================
     */
    .factory("AuthToken", function ($window) {

        var authTokenFactory = {};

        /**
         * get the token out of local storage.
         */
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem("token");
        };

        /**
         * Function to set token or clear token
         * if a token is passed, set the token
         * if there is no token, clear it from local storage
         * @param token
         */
        authTokenFactory.setToken = function (token) {
            if (token){
                $window.localStorage.setItem("token", token);
            }
            else{
                $window.localStorage.removeItem("token");
            }

        };

        return authTokenFactory;

    })

    /**
     * ===================================================
     * application configuration to integrate token into requests
     * ===================================================
     */
    .factory('AuthInterceptor', function ($q, $location, AuthToken) {

        var interceptorFactory = {};

        /**
         * Function to intercept all HTTP requests and attach a token to it.
         * @param config
         * @returns {*}
         */
        interceptorFactory.request = function (config) {

            // grab the token
            var token = AuthToken.getToken();

            // if the token exists, add it to the header as x-access-token
            if (token){
                config.headers["x-access-token"] = token;
            }

            return config;
        };

        /**
         * Function to intercept a response error.
         * @param response
         * @returns {*}
         */
        interceptorFactory.responseError = function (response) {

            // if our server returns a 403 forbidden response
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path("/login");
            }

            // return the errors from the server as a promise
            return $q.reject(response);
        };

        return interceptorFactory;

    });
