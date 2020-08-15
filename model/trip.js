const mongoose = require("mongoose");
const TripSchema = mongoose.Schema({
  busNo: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  Date,
  seatNumbers: {
    type: Array,
    required: true,
  },
  availableSeats: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("trips", TripSchema);
