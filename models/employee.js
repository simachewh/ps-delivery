/**
 * Created by Simachew on 16-Apr-16.
 */

/**
 * Grab modules
 */
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// Initialize mongoose schema
var Schema = mongoose.Schema;

var userNameMinLength = [4, 'The value of `{PATH}` (`{VALUE}`) is less than the minimum allowed length ({MINLENGTH}).'];

/**
 * Employee schema defining object.
 * todo: almost all fields can have validator and validator functions defined.
 */
var EmployeeSchema = new Schema(
    {
        userName: {type: String, required: true, minlength: userNameMinLength,
            lowercase: true, trim: true, index: {unique: true}},
        password: {type: String, required: true, select: false},
        firstName: {type: String, required: true, select: true},
        lastName: {type: String, required: true, select: true},
        email: {type: String, required: true, select: true, unique: true},
        phone: {type: String, required: true, select: true},
        // todo: Role should have enum values like [super, manager, admin, cleaner]
        role: {type: String, required: true, select: true},
        isPast: {type: Boolean, required: true, select: true},
        employment: {
            startDate: {type: Date},
            contractType: {type: String}
        },
        address: {
            home: {type: String},
            zipCode: {type: String},
            city: {type: String},
            country: {type: String}
        }
    }
); // ********** End of Employee schema definition. *************

/**
 * Hashing the password before saving the employee's info.
 */
EmployeeSchema.pre("save", function (next) {
    var employee = this;

    /**
     * Hash the passowrd only if user is new or the password is modified.
     */
    if (!employee.isModified("password")){
        return next();
    }

    /**
     * Generate the hash for password.
     * todo: No salt used for hashing the pasword
     */
    bcrypt.hash(employee.password, null, null, function (err, hash) {
        if (err) {
            return next();
        }

        employee.password = hash;
        next();
    })
}); // ********* End of password hashing before saving employee. **********

/**
 * Method to compare password provided with the saved/hashed one.
 * @param password
 * @returns {*}
 */
EmployeeSchema.methods.comparePassword = function (password) {
    var employee = this;

    return bcrypt.compare(password, employee.password, function (err, result) {
        if(err){
            return err;
        }

        return result;
    });
};

/**
 * Return/Export the model.
 */
module.exports = mongoose.model("Employee", EmployeeSchema);