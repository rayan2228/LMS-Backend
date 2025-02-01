import { Coupon } from "../model/coupon.schema.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCoupon = TryCatch(async (req, res) => {
    // code to create a coupon
    const { code, description, discountType, discountValue, minimum_order_value, maximum_discount, appliesTo, applicableCategories, applicableSubcategories, applicableCourses, applicableUsers, usageLimit, usagePerUser, auto_apply, startDate, expiryDate, isActive } = req.body;
    if ([code, discountType].some((arg) => arg?.trim() === "")) {
        return res.status(400).json(new ApiErrors(400, "Please fill in all required fields"));
    }
    if (discountType == "fixed" && discountValue === "") {
        return res.status(400).json(new ApiErrors(400, "please add discount value"));
    }
    if (new Date(startDate) > new Date(expiryDate)) {
        return res.status(400).json(new ApiErrors(400, "Start date cannot be after expiry date."));
    }

    const coupon = await Coupon.create({
        code, description, discountType, discountValue, minimum_order_value, maximum_discount, appliesTo, applicableCategories, applicableSubcategories, applicableCourses, applicableUsers, usageLimit, usagePerUser, auto_apply, startDate, expiryDate, isActive
    })
    return res.status(201).json(new ApiResponse(201, "coupon code created successfully", coupon))
});