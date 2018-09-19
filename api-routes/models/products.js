//This is the data model for the expected structure for products
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Products", productSchema);