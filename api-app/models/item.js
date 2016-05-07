/**
 * Created by Simachew on 04-May-16.
 */

var mongoose = require("mongoose");

var nameMinLength= [4, "Item name can't be less than {MINLENGTH} characters."];
var nickNameMinLength= [3, "Item nick name can't be less than {MINLENGTH} characters."];

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
            trim: true
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
            trim: true
        },
        /**
         * todo: is there a better approach than units and sizes.
         */
        units: {

        },
        sizes: {

        }
    }
)