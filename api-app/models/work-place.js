/**
 * Created by Simachew on 20-Apr-16.
 */

/**
 * Grab modules.
 */
var mongoose = require("mongoose");

var nameMinLength = [4, "Work Place name MinLength can't be less than {MINLENGTH}."];

/**
 * Initialize
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
            required: true
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