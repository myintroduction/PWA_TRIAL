//contact us form backend
const validator = require("validator");
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },

    lastName: {
        type: String,
        required: true,
        minLength: 3
    },

    mail: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID")
            }
        },

    },

    phone: {
        type: Number,
        required: true,
        min: 10
    },
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
