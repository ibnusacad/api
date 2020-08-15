const mongoose = require("mongoose");
const TicketSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: { type: String, required: true },
  priceInShilling: {
    type: Number,
    required: true,
  },
  priceInDollar: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("tickets", TicketSchema);
