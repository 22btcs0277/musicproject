const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true, // Allows null values without violating uniqueness
  },
  email: {
    type: String,
    unique: true,
    required: true, // Ensure email is always provided
  },
  password: {
    type: String,
    required: true, // Ensure password is always provided
  },
  otp: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;




















// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   otp: {
//     type: Number,
//     default: 0,
//   },

// });

// const User = mongoose.model("User", userSchema);
// module.exports = User;