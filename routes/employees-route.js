/**
 * Created by Simachew on 15-Apr-16.
 */

var express = require("express");
var db = require("../db/db");

var Employee = require("../models/employee");

var router = express.Router();

/*router.get("/", function (request, response) {
    response.json({message: "List of Employees"});
})*/

/**
 * Route handlers for the @/
 */
router.route("/")

    /**
     * Get all employees.
     */
    .get(function (req, res) {
        Employee.find(function (err, employees) {
            if (err){
                res.send(err);
            }
            res.send(employees);
        });

    })
    /**
     * Creating new Employee here.
     */
    .post(function (req, res) {
        console.log(req);
        if (!(req.body.firstName && req.body.lastName && req.body.phone
            && req.body.email && req.body.role && req.body.userName)){
            return res.status(400).json({
                message: "some params missing",
                fields: "userName, password, role, firstName, lastName, phone, email"
            });
        }

        var employee = new Employee();

        try{
            employee.userName = req.body.userName;
            employee.password = req.body.password;
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.phone = req.body.phone;
            employee.email = req.body.email;
            employee.role = req.body.role;
            employee.isPast = req.body.isPast;
            // Try saving the employee
            employee.save(function (err) {
                // If saving returns an error
                if (err){
                    // And if the error is a "duplicate entry" type
                    if (err.code == 11000){
                        return res.json({
                            success: false,
                            message: 'An employee with that username already exists. '
                        });
                    }else{
                        return res.send(err);
                    }
                }

                // Else if no error, save successful
                res.json({
                    message: "Employee Created",
                    newEmployee: employee
                });
            })
        }catch (ex){
            res.send(err.message);
        }

    });

router.route("/:employee_id")

    /**
     * Get an Employee with the given id
     */
    .get(function (req, res) {
        Employee.findById(req.params.employee_id, function (err, employee) {
            if (err){
                return res.send(err);
            }

            res.json(employee);
        });
    })
    /**
     * Updating Employee of employee_id, with the given params
     */
    .put(function (req, res) {
        Employee.findById(req.params.employee_id, function (err, employee) {

            if (err){
                return res.send(err);
            }

            // Set the new updates
            if(req.body.userName) employee.userName = req.body.userName;
            if(req.body.firstName) employee.firstName = req.body.firstName;
            if(req.body.lastName) employee.lastName = req.body.lastName;
            if(req.body.email) employee.email = req.body.email;

            employee.save(function (err) {
                if(err){
                    return res.send(err);
                }
                res.json({success: true, employee: employee});
            });
        });
    })
    /**
     * Deleting Employee by the given id.
     */
    .delete(function (req, res) {
        Employee.remove({
            _id: req.body.employee_id
        }, function (err, employee) {
            if(err){
                res.send(err);
            }
            res.json({success: true, employee: employee});
        });
    });

module.exports = router;