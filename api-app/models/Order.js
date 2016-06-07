/**
 * Created by Simachew on 06-Jun-16.
 */

var mongoose = require("mongoose");
var WorkPlace = require("./work-place");
var Item = require("./item");
var Employee = require("./employee");

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
    {
        owner: Employee,
        place: WorkPlace,

        /*
        owner: {type: mongoose.Schema.Types.ObjectId, ref: "Employee"},
        place: {type: mongoose.Schema.Types.ObjectId, ref: "WorkPlace"},
        */

        /**
         * Defining items in the order and their quantities. This approach might
         * bound changes on id to be manually updated.
         */
        items: [
            {
                item: Item,
                /*item: {type: mongoose.Schema.Types.ObjectId, ref: "ItemModel"}, */
                quantity: {type: Number, default: 1}
            }
        ]
    }
);

module.exports = mongoose.model("order", OrderSchema);