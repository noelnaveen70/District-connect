const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String,
    default:"user", 
    required: true 
  }
});

// Creating the User model from the schema
const User = mongoose.model.User || mongoose.model('users', UserSchema);

module.exports = User;