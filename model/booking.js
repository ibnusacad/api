const mongoose = require("mongoose");
const BookingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  busNo: {
    type: String,
    required: true,
  },
  seatNo: {
    type: Array,
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
  route: {
    type: String,
    required: true,
    default: "Sales Office",
  },
  currency: {
    type: String,
    required: true,
  },
  totalFare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    required: true,
    default: "pending",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Booking", BookingSchema);
