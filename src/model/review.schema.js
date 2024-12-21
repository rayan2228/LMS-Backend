import { model, models, Schema } from "mongoose";

const reviewSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, {
    timestamps: true
});
export const Review = models.Module || model("Review", reviewSchema)