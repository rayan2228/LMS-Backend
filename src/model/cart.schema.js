import mongoose, { Schema, model } from "mongoose";


const cartSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        course: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }]
    },
    { timestamps: true }
);

export const Cart = mongoose.models.Cart || model("Cart", cartSchema);
