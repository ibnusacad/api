const mongoose = require("mongoose");
const RouteSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  routes: {
    type: Array,
    default: "Sales Office",
  },
});
module.exports = mongoose.model("Routes", RouteSchema);
