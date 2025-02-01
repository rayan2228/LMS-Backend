import mongoose, { Schema, model } from "mongoose";


const cartSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        course: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
        totalPrice: { type: Number, required: true, default: 0 }, 
        totalQuantity: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

export const Cart = mongoose.models.Cart || model("Cart", cartSchema);
