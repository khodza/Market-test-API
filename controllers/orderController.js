const handleFactory =require('./handlerFactory');
const Order =require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const Product =require('../models/productModel');
const AppError =require('../utils/appError');
const User = require('../models/userModel');

exports.addOrder = catchAsync(async (req, res, next) => {
  const { products } = req.body;

  // Retrieve the products from the database
  const productIds = products.map(p => p.product);
  const foundProducts = await Product.find({ _id: { $in: productIds } });

  // Check if all products exist in the database
  const foundProductIds = foundProducts.map(p => p._id.toString());
  const missingProductIds = productIds.filter(id => !foundProductIds.includes(id));
  if (missingProductIds.length > 0) {
    return next(new AppError(`The following product IDs do not exist in the database: ${missingProductIds.join(', ')}`, 400));
  }

  // Calculate the total
  const total = products.reduce((acc, item) => {
    const product = foundProducts.find(p => p._id.equals(item.product));
    return acc + (product.price * item.quantity);
  }, 0);

  // Create the order
  const order = new Order({
    user: req.user._id,
    products,
    total,
    status: 'pending',
  });

  
  //Update the user
  const userId =req.user.id;
  const user = await User.findById(userId);
  user.orders.push(order.id);
  await order.save();
  await user.save({validateBeforeSave:false})
  

  res.status(201).json({ status: 'success', data: order });
});

  
exports.updateOrder = catchAsync(async (req, res) => {
  const orderId = req.params.id;

  const { products, status } = req.body;

  // Retrieve the order from the database
  const order = await Order.findById(orderId);

  // Check if order exists
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Update the products field if it is defined
  if (products) {
    // Retrieve the products from the database
    const productIds = products.map(p => p.product);
    const foundProducts = await Product.find({ _id: { $in: productIds } });

    // Check if all products exist in the database
    const foundProductIds = foundProducts.map(p => p._id.toString());
    const missingProductIds = productIds.filter(id => !foundProductIds.includes(id));
    if (missingProductIds.length > 0) {
      throw new AppError(`The following product IDs do not exist in the database: ${missingProductIds.join(', ')}`, 400);
    }

    // Calculate the total
    const total = products.reduce((acc, item) => {
      const product = foundProducts.find(p => p._id.equals(item.product));
      return acc + (product.price * item.quantity);
    }, 0);

    order.products = products;
    order.total = total;
  }

  // Update the status field if it is defined
  if (status) {
    order.status = status;
  }

  await order.save();
  res.status(200).json({ status: 'success', data: order });
});  
  exports.getMyOrders =catchAsync(async(req,res,next)=>{
    req.query = {...req.query, ...{user: req.user.id}};
    next();
  })
exports.getAllOrders =handleFactory.getAll(Order);
exports.getOrder =handleFactory.getOne(Order);
exports.deleteOrder =handleFactory.deleteOne(Order);
