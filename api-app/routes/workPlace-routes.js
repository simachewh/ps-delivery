/**
 * Created by Simachew on 20-Apr-16.
 */

var express = require("express");
/**
 * Work place Schema Object.
 */
var WorkPlace = require("../models/work-place");

/**
 * Express router.
 */
var router = express.Router();

/**
 * Root route handler for workplaces @/
 */
router.route("/")
    /**
     * Get all work place entries.
     * todo: add pagination.
     */
    .get(function (req, res) {
        WorkPlace.find(function (err, workPlaces) {
            if (err) {
                return res.send(err);
            }
            res.send(workPlaces);
        })
    })
    /**
     * Add new work place entry.
     */
    .post(function (req, res) {
        //handel empty request
        if (!(req.body.name)) {
            return res.status(400).json({
                message: "Workplace Name can not be empty",
                fields: ["name"]
            });
        }

        var workPlace = new WorkPlace();
        //todo: implement saving this workplace object
      

        try {
            workPlace.name = req.body.name;
            workPlace.nickName = req.body.nickName;
            workPlace.isPast = req.body.isPast;
            workPlace.noOfClosets = req.body.noOfClosets;
            workPlace.address = req.body.address;
            workPlace.contactPerson = req.body.contactPerson;

            workPlace.save(function (err) {
                if (err){
                    return res.send(err);
                }
               return res.json({
                   success: true,
                   message: "Work Place saved"
               });
            });
        } catch (ex){
            return res.send(ex.message);
        }

    });

function updateWorkPlace(req, workPlace) {
    if (req.body.name) {
        workPlace.name = req.body.name;
    }
    if (req.body.nickName) {
        workPlace.nickName = req.body.nickName;
    }
    if (req.body.isPast) {
        workPlace.isPast = req.body.isPast;
    }
    if (req.body.contactPerson.fullName) {
        workPlace.contactPerson.fullName = req.body.contactPerson.fullName;
    }
    if (req.body.contactPerson.phone) {
        workPlace.contactPerson.phone = req.body.contactPerson.phone;
    }
    if(req.body.contactPerson.email){
        workPlace.contactPerson.email = req.body.contactPerson.email;
    }
    if(req.body.street){
        workPlace.address.street = req.body.street;
    }
    if(req.body.address.zipCode){
        workPlace.address.zipCode = req.body.address.zipCode;
    }
    if(req.body.address.city){
        workPlace.address.city = req.body.address.city;
    }
    if(req.body.address.country){
        workPlace.address.country = req.body.address.country;
    }
}
router.route("/:workPlace_id")
    /**
     * Get a workplace by the given worplace id.
     */
    .get(function (req, res) {
        WorkPlace.findById(req.params.workPlace_id,
            function (err, workPlace) {
                if (err) {
                    return res.send(err);
                }

                res.json(workPlace);
            });
    })
    /**
     * Update a workplace by the given ID.
     * Updates are not checked for fields that are not provided.
     * If provided it's updated if not ignored.
     * Views are assumed to update one field at a time.
     */
    .put(function (req, res) {
        WorkPlace.findById(req.body.workPlace_id,
            function (err, workPlace) {
                if (err) {
                    return res.send(err);
                }
                try {
                    // update the workplace to the new values
                    updateWorkPlace(req, workPlace);

                    // save the updated workplace
                    workPlace.save(function (err) {
                        if(err){
                            return res.send(err);
                        }
                        res.json({
                            success: true,
                            workplace: workPlace
                        });
                    });
                } catch (ex) {
                    return res.send(ex.message);
                }
            });
    })
    .delete(function (req, res) {
        WorkPlace.findById(req.params.workPlace_id,
        function (err, workPlace) {
            if(err){
                return res.send(err);
            }

            workPlace.isPast = true;
            workPlace.save(function (err) {
                if (err){
                    return res.send(err);
                }
                return res.json({
                    success: true,
                    message: "Work place moved to recycle bin"
                });
            })
        })
        /*try {
            WorkPlace.remove(
                {
                    _id: req.body.workPlace_id
                },
                function (ree, workPlace) {
                    if (ree) {
                        return res.seed(err);
                    }
                    res.json({
                        success: true,
                        workplace: workPlace
                    });
                }
            );
        } catch (ex) {
            return res.seed(ex.message);
        } */
    });

module.exports = router;