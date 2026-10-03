const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  emoji: String,
});

const orderSchema = new mongoose.Schema({
  orderNumber: Number,
  items: Array,
  total: Number,
  queuePosition: Number,
  status: {
    type: String,
    default: "Waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.model("Food", foodSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Food,
  Order,
};