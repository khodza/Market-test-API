const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
    name: {
      type: String,
      unique:true,
      required: [true, 'Please provide a name for the category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the category'],
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

  const Category = mongoose.model('Category', categoriesSchema);

  module.exports = Category;
  