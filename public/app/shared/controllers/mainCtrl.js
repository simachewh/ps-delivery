angular.module("mainCtrl", [])

    .controller("mainController", function ($rootScope, $location, Auth) {

        var vm = this;
        vm.testStr = "If you see this mainController is active on your page";

        // get info if a person is logged in
        vm.loggedIn = Auth.isLoggedIn();

        //tester: checking to see the effect on the FE
        vm.loggedIn = false;

        /**
         * Check to see if an employee is logged in on every request
         */
        $rootScope.$on("$routeChangeStart", function () {
            vm.loggedIn = Auth.isLoggedIn();

            //tester: checking to see the effect on FE
            vm.loggedIn = false;
            // get employee information on page load
            Auth.getEmployee()
                .then(function (data) {
                    vm.employee = data.data;
                });
        });

        /**
         * function to handle login form.
         */
        vm.doLogin = function () {
            vm.processing = true;

            // clear the error
            vm.error = '';

            Auth.login(vm.loginData.userName, vm.loginData.password)
                .success(function (data) {
                    vm.processing = false;

                    // if an employee successfully logs in, redirect to employee page
                    if (data.success) {
                        $location.path("/employees");
                    }
                    else {
                        vm.error = data.message + "smt";
                    }

                });
        };

        /**
         * Function to handle logging out.
         */
        vm.doLogout = function () {
            Auth.logout();
            vm.employee = "";

            $location.path("/login");
        };

        /**
         * Function to create a sample employee.
         */
        vm.createSample = function () {
            Auth.createSampleEmployee();
        };

    });
