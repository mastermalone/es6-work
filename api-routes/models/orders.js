const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Products', 
    required: true 
  }, //Set a relationship to the Products Schema
  quantity: { 
    type: Number, 
    default: 1 
  }// setting this default to 1 ensures that 1 order will always be set and not cause an error
});

module.exports = mongoose.model('Order', ordersSchema);