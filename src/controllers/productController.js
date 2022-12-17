const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

exports.getProductInCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);
  await category.populate("product");
  res
    .status(200)
    .send({ results: category.product.length, data: category.product });
});

// @desc    Get list of products
// @access  all
exports.getProducts = factory.getAll(Product);

// @desc    Get specific product by id
// @access  all
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @access  admin
exports.createProduct = factory.createOne(Product);
// @desc    Update specific product
// @access  admin
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @access  admin
exports.deleteProduct = factory.deleteOne(Product);
