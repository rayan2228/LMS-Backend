import e from "express";
import { auth } from "../middleware/auth.middleware.js";
import { createCart, getCartByUser } from "../controller/cart.controller.js";

const router = e.Router();
router.route("/carts").post(auth, createCart).get(auth, getCartByUser);

export default router;
