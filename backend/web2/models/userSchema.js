const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  socialURL: {
    type: String,
  },
  boughtProjects: {
    type: [Number],
    default: [],
  },
  createdProjects: {
    type: [Number], 
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
