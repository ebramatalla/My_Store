const express = require("express");
const {
  createCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/category", createCategory);
router.get("/categories", getCategories);
router.get("/category/:id", getOneCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
