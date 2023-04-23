// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');

const handleFactory =require('./handlerFactory')
const Product =require('../models/productModel')

const AppError =require('../utils/appError')
const catchAsync =require('../utils/catchAsync')

exports.getAllProducts = handleFactory.getAll(Product);
exports.addProduct =handleFactory.createOne(Product);
exports.getOneProduct =handleFactory.getOne(Product);
exports.updateOneProduct=handleFactory.updateOne(Product);
exports.deleteOneProduct=handleFactory.deleteOne(Product);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductImages = upload.fields([
  { name: 'image', maxCount: 1 }
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
    req.body.author=req.user.id;
    if (!req.files.image) return next();
    // 1) Cover image
    req.body.image = `product-${req.user.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.image[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${req.body.image}`);
  
    next();
  });