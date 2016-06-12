/**
 * Created by Simachew on 07-Jun-16.
 */


var express = require("express");

var Item = require("../models/item");

var router = express.Router();

router.route("/")
    .get(function (req, res) {
        Item.find(function (err, items) {
            if(err){
                return res.send(err);
            }
            res.send(items);
        });
    })
    .post(function (req, res) {
        if (!(req.body.name /*&& req.body.unit && req.body.availableSizes */)) {
            
            return res.status(400).json({
                message: "some params are missing, params must include:",
                params: ["name", "unit", "availableSizes"]
            });
        }
        try {
            var item = new Item();
            item.name = req.body.name;
            item.nickName = req.body.nickName;
            item.purpose = req.body.purpose;
            item.unit = req.body.unit;
            item.availableSizes = req.body.availableSizes;
            item.isReparable = req.body.isReparable;
            item.isPast = req.body.isPast;

            item.save(function (err) {
                if(err){
                    return res.json(err);
                } else {
                    return res.json({
                        success: true,
                        message: "Item Created",
                        item: item
                    });
                }
            });
        } catch (ex){
            return res.send(ex);
        }

    });

router.route("/:item_id")
    .get(function (req, res) {
        Item.findById(req.params.item_id,
        function (err, item) {
            if (err){
                return res.send(err);
            }
            return res.json(item);
        });
    })
    .put(function (req, res) {
        Item.findById(req.params.item_id,
            function (err, item) {
            if (err){
                return res.send(err);
            }
            if (req.body.unit) 
                item.unit = req.body.unit;
            if(req.body.name) 
                item.name = req.body.name;
            if(req.body.nickName) 
                item.nickName = req.body.nickName;
            if(req.body.purpose) 
                item.purpose = req.body.purpose;
            if(req.body.isReparable) 
                item.isReparable = req.body.isReparable;
            if(req.body.availableSizes) 
                item.avaisizes = req.body.availableSizes;
            if(req.body.isPast)
                item.isPast = req.body.isPast;
                
            item.save(function (err) {
                if(err) {
                    return res.send(err);
                }
                return res.json({
                    success: true,
                    item: item});
            });
        });
        
    })
    .delete(function (req, res) {
        Item.findById(req.params.item_id,
        function (err, item) {
            if (err) {
                return res.send(item);
            }
            item.isPast = true;
             item.save(function (err) {
                 if(err){
                     return res.send(err);
                 }
                 return res.json({
                     success: true,
                     item: item
                 });
             });
        });
    });

module.exports = router;