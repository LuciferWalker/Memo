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
  },
  createdProjects: {
    type: [Number],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
