const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: false },
});

module.exports = model("Product", productSchema);
