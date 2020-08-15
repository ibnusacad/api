const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 3,
  },
  secondname: {
    type: String,
    required: true,
    min: 3,
  },
  lastname: {
    type: String,
    required: true,
    min: 3,
  },
  username: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  roles: {
    type: String,
    enum: ["admin", "seller", "user"],
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  profilePicture: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  createDate: {
    type: Date,
    default: Date,
  },
  bookings: { type: Array, ref: "Booking" },
});

module.exports = mongoose.model("User", UserSchema);
