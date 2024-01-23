const mongoose = require("mongoose");
const User = require("./users");
const Schema = mongoose.Schema;

const orders = Schema({
  userId: {
    type: String,
    required: true,
    ref: "Users",
  },
  user: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  name_product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  transaction_status: {
    type: String,
  },
});

module.exports = mongoose.model("orders", orders);
