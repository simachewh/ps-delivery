/**
 * Created by Simachew on 07-Jun-16.
 */


var express = require("express");

var ItemModel = require("../models/item");
var ItemController = require("../controllers/itemController");

var router = express.Router();

router.route("/")
    .get(function (req, res) {
        var result = ItemController.getItems();
        res.send(result);
    })
    .post(function (req, res) {
        if (!(req.body.name && req.body.unit && req.body.availableSizes)) {
            return res.status(400).json({
                message: "some params are missing, params must include:",
                params: ["name", "unit", "availableSizes"]
            });
        }
        var Item = new ItemModel();
        Item.name = req.body.name;
        Item.nickName = req.body.nickName;
        Item.purpose = req.body.purpose;
        Item.unit = req.body.unit;
        Item.availableSizes = req.body.availableSizes;
        Item.isReparable = req.body.isReparable;
        ItemController.saveItem(Item);
    });

router.route("/:item_id")
    .get(function (req, res) {

    })
    .put(function (req, res) {

    })
    .delete(function (req, res) {

    });

module.exports = router;