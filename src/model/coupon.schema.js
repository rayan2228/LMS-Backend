import { model, models, Schema } from "mongoose";

const couponSchema = new Schema({
    code: { type: String, unique: true, required: true },
    description: String,
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    minimum_order_value: Number, // Optional minimum cart value to apply the coupon
    maximum_discount: Number, // Optional cap for percentage discounts
    appliesTo: {
        type: String,
        enum: ["all", "category", "course", "user"],
        default: "all",
    },
    applicableCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    applicableSubcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }],
    applicableCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    applicableUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    usageLimit: { type: Number, default: null }, // Null for unlimited
    usagePerUser: { type: Number, default: 1 },
    used_by: [
        {
            customer_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            order_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
            used_at: { type: Date, default: Date.now() }
        }
    ],
    auto_apply: Boolean,
    startDate: { type: Date },
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const Coupon = models.Coupon || model("Coupon", couponSchema)