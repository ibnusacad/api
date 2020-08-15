const mongoose = require("mongoose");
const BusSchema = mongoose.Schema({
  busNo: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Buses", BusSchema);
