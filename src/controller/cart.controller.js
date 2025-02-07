import { Cart } from "../model/cart.schema";
import ApiErrors from "../utils/ApiErrors";
import ApiResponse from "../utils/ApiResponse";
import { TryCatch } from "../utils/TryCatch";

const createCart = TryCatch(async (req, res) => {
  const { course } = req.body;
  if (course.length === 0) {
    throw new ApiErrors(400, "no course added");
  }
  const isCart = await Cart.findOne({ user: user._id });
  let cart;
  if (isCart) {
    cart = await Cart.findOneAndUpdate(
      { user: user._id },
      { $push: { course } },
      { new: true }
    );
  } else {
    cart = await Cart.create({ user: req.user._id, course });
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "course added successfully", cart));
});

const getCartByUser = TryCatch(async (req, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return res.status(200).json(new ApiResponse(200, "no cart found", cart));
  }
  return res.status(200).json(new ApiResponse(200, "all carts", cart));
});

export { createCart, getCartByUser };
