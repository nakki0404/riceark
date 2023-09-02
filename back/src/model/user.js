const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  ID: String,
  Password: String,
  Role: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
