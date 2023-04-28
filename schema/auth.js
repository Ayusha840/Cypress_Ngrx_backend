const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const authSchema = mongoose.Schema({
  // businessName: {
  //   type: String,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unqiue: true,
    validate: function () {
      return emailValidator.validate(this.email)
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'staff', 'delivery'],
    default: 'manager',
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    // emun:['active','inactive'],
    default: 'inactive',
  },
})

module.exports = mongoose.model('auth', authSchema)
