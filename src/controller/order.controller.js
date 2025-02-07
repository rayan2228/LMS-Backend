import { Order } from "../model/order.schema.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createOrder = TryCatch(async (req, res) => {
  const { cart, totalPrice, paymentMethod, paymentStatus } = req.body;
  if (
    [cart, totalPrice, paymentMethod, paymentStatus].some((v) => !v?.trim())
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await Order.create({
    cart,
    totalPrice,
    paymentMethod,
    paymentStatus,
    status: paymentStatus === "failed" ? "cancelled" : "pending",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Order created successfully", { order }));
});

const getOrdersByUser = TryCatch(async (req, res) => {
  const user = req.user;
  const orders = await Order.find({ user: user._id });
  if (!orders) {
    return res.status(200).json(new ApiResponse(200, "Orders not found", {}));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Orders retrieved successfully", { orders }));
});

export { createOrder, getOrdersByUser };
