const mongoose = require('mongoose');


const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the product'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the product'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for the product'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: [true, 'Please provide a category for the product'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image for the product'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide a quantity for the product'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Please provide an author for the product'],
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



const Product = mongoose.model('Product', productsSchema);

module.exports = Product;