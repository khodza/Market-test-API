const handleFactory =require('./handlerFactory');
const Order =require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const Product =require('../models/productModel');

exports.addOrder = catchAsync(async (req, res) => {
    const { products } = req.body;
    // Retrieve the products from the database
    const productIds = products.map(p => p.product);
    const foundProducts = await Product.find({ _id: { $in: productIds } });
    // Calculate the total
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of products) {
      const product = foundProducts.find(p => p._id.equals(item.product));
      total += product.price * item.quantity;
    }
  
    // Create the order
    const order = new Order({
      user: req.user._id,
      products,
      total,
      status: 'pending',
    });
  
    await order.save();
    res.status(201).json({ status: 'success', data: order });
  });
  
  exports.updateOrder =catchAsync(async (req, res) => {
    const { products } = req.body;
    // Retrieve the products from the database
    const productIds = products.map(p => p.product);
    const foundProducts = await Product.find({ _id: { $in: productIds } });
    // Calculate the total
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of products) {
      const product = foundProducts.find(p => p._id.equals(item.product));
      total += product.price * item.quantity;
    }
  
    // Create the order
    const order = new Order({
      user: req.user._id,
      products,
      total,
      status: 'pending',
    });
  
    await order.save();
    res.status(201).json({ status: 'success', data: order });
  });

  
exports.getAllOrders =handleFactory.getAll(Order);
exports.getOrder =handleFactory.getOne(Order);
exports.deleteOrder =handleFactory.deleteOne(Order);

// exports.getMyOrders