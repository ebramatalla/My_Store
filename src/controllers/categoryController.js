const factory = require("./handlersFactory");
const Category = require("..//models/categoryModel");

// @description   get all categories
// access         All
exports.getCategories = factory.getAll(Category);

// @description   get one category
// access         All
exports.getOneCategory = factory.getOne(Category);

// @description   Create a new category
// access         Admin
exports.createCategory = factory.createOne(Category);

// @description   update a category
// access         Admin
exports.updateCategory = factory.updateOne(Category);

// @desc          Delete  category
// @access        Admin
exports.deleteCategory = factory.deleteOne(Category);
