const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

const cartTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((element) => {
    totalPrice += element.quantity * element.price;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

// this function add product to cart
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  var { productId } = req.body;
  console.log(productId);
  var product = await Product.findById(productId);
  if (!product || product.quantity < 1) {
    return next(new ApiError("Product not found or product sold out", 404));
  }
  // get cart of user
  var cart = await Cart.findOne({ user: req.user._id });
  // if cart is not found create a new cart
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, price: product.price }],
    });
  } else {
    // if has cart push item but first check if product exists
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
    // this is mean product is already exists
    if (productIndex > -1) {
      const item = cart.cartItems[productIndex];
      item.quantity += 1;
      cart.cartItems[productIndex] = item;
    } else {
      // not found so push
      cart.cartItems.push({ product: productId, price: product.price });
    }
  }
  cartTotalPrice(cart);
  await cart.save();
  res.status(200).send({
    status: "success",
    message: "product was added successfully",
    length: cart.cartItems.length,
    data: cart,
  });
});

// this function to get cart
exports.getMyCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(
      new ApiError(
        "No Cart For this user try to add product to create Cart",
        404
      )
    );
  }
  res.status(200).send({
    status: "success",
    data: cart,
    length: cart.cartItems.length,
  });
});

// this function to remove item from cart
exports.removeItemFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.id } },
    },
    {
      new: true,
    }
  );
  cartTotalPrice(cart);
  await cart.save();
  res.status(200).send({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
// reduce quantity of cart items
exports.changeQuantityInCart = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("cart not found", 404));
  }
  const productIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.id
  );
  if (productIndex > -1) {
    const product = cart.cartItems[productIndex];
    const productInStore = await Product.findById(product.product);
    if (productInStore.quantity < quantity) {
      return next(
        new ApiError("the quantity you want is gt than we Have ", 400)
      );
    }
    product.quantity = quantity;
    cart.cartItems[productIndex] = product;
  } else {
    return next(new ApiError("product not found in cart", 404));
  }
  cartTotalPrice(cart);
  await cart.save();
  res.status(200).send({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
