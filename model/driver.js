const mongoose = require("mongoose");
const DriverSchema = mongoose.Schema({
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
  license: {
    type: String,
    required: true,
  },
  busNo: {
    type: String,
    required: true,
  },
  trips: {
    type: Number,
  },
});

module.exports = mongoose.model("Drivers", DriverSchema);
