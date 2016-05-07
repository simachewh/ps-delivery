angular.module("app.routes", ["ngRoute"])

    .config(function ($routeProvider, $locationProvider) {

        $routeProvider

        // route for the home page
            .when("/", {
                templateUrl: "app/views/pages/home.html"
            })

            // login page
            .when("/login", {
                templateUrl: "app/views/pages/login.html",
                controller: "mainController",
                controllerAs: "login"
            })

            // show all employees
            .when("/employees", {
                templateUrl: "app/views/pages/employees/all.html",
                controller: "employeeController",
                controllerAs: "employee"
            })

            // form to create a new user
            // same view as edit page
            .when("/employees/create", {
                templateUrl: "app/views/pages/employees/single.html",
                controller: "employeeCreateController",
                controllerAs: "employee"
            })

            // page to edit a user
            .when("/employees/:employee_id", {
                templateUrl: "app/views/pages/employees/single.html",
                controller: "employeeEditController",
                controllerAs: "employee"
            });

        $locationProvider.html5Mode(true);

    });
