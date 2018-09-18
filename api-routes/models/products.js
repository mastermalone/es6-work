//This is the data model for the expected structure for products
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

module.exports = mongoose.model("Products", productSchema);