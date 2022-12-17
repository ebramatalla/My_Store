const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  getProductInCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/productsInCategory", getProductInCategory);
router.post("/product", createProduct);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
