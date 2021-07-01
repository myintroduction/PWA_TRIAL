//contact us form backend
const validator = require("validator");
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },

  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email ID")
      }
    }
  },

  phone: {
    type: Number,
    required: true,
    min: 10
  },

  message: {
    type: String,
    required: true,
    minLength: 3
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;