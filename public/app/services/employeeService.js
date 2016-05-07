/**
 * Created by Simachew on 06-May-16.
 */

var baseURL = "/api.psdelivery";
var employeesURL = "/employees/";

angular.module("employeeService", [])

    .factory("Employee", function($http) {

        /**
         * Create a new object.
         * @type {{}}
         */
        var employeeFactory = {};

        /**
         * Get a single employee.
         * @param id
         * @returns {*}
         */
        employeeFactory.get = function(id) {
            return $http.get(baseURL + employeesURL + id);
        };

        /**
         * Get all employees
         * @returns {*}
         */
        employeeFactory.all = function() {
            return $http.get(baseURL + employeesURL);
        };

        /**
         * Create a new employee.
         * @param employeeData
         * @returns {*}
         */
        employeeFactory.create = function(employeeData) {
            return $http.post(baseURL + employeesURL, employeeData);
        };

        /**
         * Update an employee by the given id with the
         * given employee data.
         * @param id
         * @param employeeData
         * @returns {*}
         */
        employeeFactory.update = function(id, employeeData) {
            return $http.put(baseURL + employeesURL + id, employeeData);
        };

        /**
         * Delete an empoyee by the given id.
         * @param id
         */
        employeeFactory.delete = function(id) {
            return $http.delete(baseURL + employeesURL + id);
        };

        // return our entire employeeFactory object
        return employeeFactory;

    });