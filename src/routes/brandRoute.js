const express = require("express");
const {
  createBrand,
  getBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const router = express.Router();

router.get("/brand", getAllBrands);
router.get("/brand/:id", getBrand);
router.post("/brand", createBrand);
router.patch("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);
module.exports = router;
