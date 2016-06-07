/**
 * Created by Simachew on 20-Apr-16.
 */

/**
 * Grab modules.
 */
var mongoose = require("mongoose");

/**
 * Validator for name of a Workplce.
 * @type {*[]}
 */
var nameMinLength = [4, "Work Place name MinLength can't be less than {MINLENGTH}."];

/**
 * Initialize mongoose Schema.
 */
var Schema = mongoose.Schema;
/**
 * Work palace Schema definition object.
 */
var WorkPlaceSchema = new Schema(
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
            trim: true
        },
        isPast : {
            type: Boolean,
            default: false
        },
        noOfClosets: {
            type: Number
        },
        contactPerson: {
            fullName: {
                type: String,
            },
            phone: {
                type: String,
            },
            email: {
                type: String
            }
        },
        address: {
            street: {
                type: String
            },
            zipCode: {
                type: String
            },
            city:{
                type: String
            },
            country: {
                type : String
            }

        }

    }
);

module.exports = mongoose.model("WorkPlace", WorkPlaceSchema);