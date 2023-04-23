const handleFactory =require('./handlerFactory');
const Category =require('../models/categoryModel');

exports.addCategory = handleFactory.createOne(Category);
exports.getAllCategories =handleFactory.getAll(Category);
exports.getCategory =handleFactory.getOne(Category);
exports.updateCategory =handleFactory.updateOne(Category);
exports.deleteCategory =handleFactory.deleteOne(Category);