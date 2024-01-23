const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  name_product: {
    type: String,
    required: true,
  },
  detail_product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("products", products);
