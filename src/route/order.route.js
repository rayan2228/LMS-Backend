import e from "express";
import { auth } from "../middleware/auth.middleware.js";
import { createOrder } from "../controller/order.controller.js";

const router = e.Router()
router.route("/orders").post(auth, createOrder).get(auth, )
export default router