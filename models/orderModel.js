const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Please provide a user for the order'],
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: [true, 'Please provide a product for the order'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide a quantity for the product'],
    },
  }],
  total: {
    type: Number,
    required: [true, 'Please provide a total for the order'],
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;
