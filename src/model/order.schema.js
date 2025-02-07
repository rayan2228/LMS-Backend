import mongoose, { Schema, model } from "mongoose";
const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "processing", "delivered", "cancelled"],
            default: "pending",
        },
        paymentMethod: { type: String, enum: ["stripe", "paypal", "sslCommerz"], required: true },
        paymentStatus: { type: String, enum: ["paid", "failed"], default: "paid" },
    },
    { timestamps: true }
);

export const Order = mongoose.models.Order || model("Order", orderSchema);
