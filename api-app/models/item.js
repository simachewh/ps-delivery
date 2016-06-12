/**
 * Created by Simachew on 04-May-16.
 */

var mongoose = require("mongoose");

/**
 * Validator for the name of an Item.
 * @type {*[]}
 */
var nameMinLength = [4, "Item name can't be less than {MINLENGTH} characters."];

/**
 * Validator for nickname of an Item.
 * @type {*[]}
 */
var nickNameMinLength = [3, "Item nick name can't be less than {MINLENGTH} characters."];

/**
 * An enum validator for units of an Item.
 * @type {{values: Array, message: string}}
 */
var unitsList = {
    values: "litre number SML no-unit meter".split(" "),
    message: "No such value {VALUE} defined for {PATH}"
};

/**
 * An enum validator for purpose of an Item.
 * @type {{values: string, message: string}}
 */
var purposeList = {
    values: "general floor wc dust surface glass carpet special".split(" "),
    message: "No such value {VALUE} defined for {PATH}"
};

/**
 * A standard size for all uni size Items.
 * @type {string}
 */
var standardSize = "uni";

var Schema = mongoose.Schema;

/**
 * Item Schema definition.
 */
var ItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: nameMinLength,
            lowercase: true,
            trim: true,
            index: {unique: true}
        },
        nickName: {
            type: String,
            lowercase: true,
            minlength: nickNameMinLength
        },
        /**
         * purpose is the use of the item. General, WC, floor,
         * furniture, glass etc.
         * todo: define an enum of values for it.
         */
        purpose: {
            type: String,
            lowercase: true,
            trim: true,
            enum: purposeList
        },
        /**
         * todo: is there a better approach than units and sizes.
         */
        unit: {
            type: String,
            lowercase: true,
            trim: true,
            enum: unitsList,
            default: unitsList[unitsList.values.length - 1]
        },
        /**
         * A pres save hook (middleware) is needed to initialize an empty array of
         * sizes for when the item in question has a standard size.For example:
         * a spray bottle or a floor towel, frote.
         */
        availableSizes: [String],
        isReparable: {type: Boolean, default: false},
        isPast: {type: Boolean, default: false}
    }
);

/**
 * Middleware to add default size of an item if not specified.
 * TOdo: restrict saving if isPast is true. saving/ updating
 * a past object is done only after updating ispast to true through
 * the url provided for it.
 */
ItemSchema.pre("save", function (next) {
    var item = this;

    if(!item.availableSizes){
        item.avaisizes = [standardSize];
    }

    next();
});

module.exports = mongoose.model("Item", ItemSchema);