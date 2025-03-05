const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  category: { type: String, required: true },
  rate: { type: Number, required: true }, // Added rate field
  weight: { type: Number, required: true }, // Added weight field
  short_description: { type: String, required: true }, // Added short description field
  description: { type: String, required: true },
  material: { type: String, required: true },
  dimension: { type: String, required: true }, // Added dimension field
  other_info: { type: String },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);

