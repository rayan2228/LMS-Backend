import e from "express";
import { createCoupon } from "../controller/coupon.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";

const router = e.Router()
router.route("/coupons").post(auth, checkAccess(["create_coupons"]), createCoupon)
export default router