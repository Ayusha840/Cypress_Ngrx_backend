const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unqiue: true,
    required: true,
  },
  avatar: {
    type: String,
  }
})

module.exports = mongoose.model('user', userSchema)
