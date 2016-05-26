/**
 * Created by Simachew on 06-May-16.
 */

angular.module("employeeCtrl", ["employeeService"])

    /**
     * Controller to get all employees and delete an employee.
     */
    .controller("employeeController", function (Employee) {

        var vm = this;

        // set a processing variable to show loading things
        vm.processing = true;

        // Grab all the employees at page load
        Employee.all()
            .success(function (data) {

                // when all the Employees come back, remove the processing variable
                vm.processing = false;

                // bind the employees that come back to vm.employees
                vm.employees = data;
            });

        /**
         * Function to delete employee.
         * @param id
         */
        vm.deleteEmployee = function (id) {
            vm.processing = true;

            Employee.delete(id)
                .success(function (data) {
                    /**
                     * get all employees to update the table
                     * api can also be set up to return the
                     * list of employees with the delete call
                     */
                    Employee.all()
                        .success(function (data) {
                            vm.processing = false;
                            vm.employees = data;
                        });

                });
        };

    })

    /**
     * Controller for employee creation.
     */
    .controller('employeeCreateController', function (Employee) {

        var vm = this;

        /**
         * variable to hide/show elements of the view
         * differentiates between create or edit pages
         * @type {string}
         */
        vm.type = "create";

        /**
         * Function to create an employee
         */
        vm.saveEmployee = function () {
            vm.processing = true;
            vm.message = '';

            // use the create function in the employeeService
            Employee.create(vm.employeeData)
                .success(function (data) {
                    vm.processing = false;
                    vm.employeeData = {};
                    vm.message = data.message;
                });

        };

    })

    /**
     * Controller applied to employee edit page
     */
    .controller('employeeEditController', function ($routeParams, Employee) {

        var vm = this;

        /**
         * variable to hide/show elements of the view
         * differentiates between create or edit pages
         * @type {string}
         */
        vm.type = 'edit';

        /**
         * get the employee data for the employee we want to edit
         * $routeParams is the way we grab data from the URL
         */
        Employee.get($routeParams.employee_id)
            .success(function (data) {
                vm.employeeData = data;
            });

        /**
         * Function to save an employee
         */
        vm.saveEmployee = function () {
            vm.processing = true;
            vm.message = '';

            // call the employeeService function to update
            Employee.update($routeParams.employee_id, vm.employeeData)
                .success(function (data) {
                    vm.processing = false;

                    // clear the form
                    vm.employeeData = {};

                    // bind the message from our API to vm.message
                    vm.message = data.message;
                });
        };

    });