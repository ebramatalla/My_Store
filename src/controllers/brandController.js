const factory = require("./handlersFactory");
const Brand = require("../models/brandModel");

// description    get All Brand
// access         All
exports.getAllBrands = factory.getAll(Brand);
// description    get one Brand
// access         All
exports.getBrand = factory.getOne(Brand);
// description    create Brand
// access         Admin
exports.createBrand = factory.createOne(Brand);
// description    update Brand
// access         Admin
exports.updateBrand = factory.updateOne(Brand);
// @desc          Delete  Brand
// @access        Admin
exports.deleteBrand = factory.deleteOne(Brand);
