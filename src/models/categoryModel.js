const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
  },
  { timestamps: true }
);
categorySchema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
