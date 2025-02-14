const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed in controller
  role: { type: String, default:"user" }
});

//  Fix: Use `mongoose.models.User` to prevent re-compiling
const User = mongoose.models.User || mongoose.model('users', userSchema);

module.exports = User;
