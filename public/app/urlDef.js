/**
 * Created by Simachew on 06-May-16.
 */

angular.module("urlDef", [])
    .factory("urls", function () {
        var urls = {};
        urls.base = "/api.psdelivery";
        urls.employees = "/employees/";
        urls.me = "/me/";
        urls.sampleEmp = "/sampleEmp/";
        urls.workPlace = "/workplaces/";
        urls.authenticate = "/authenticate";

        return urls;
    })
