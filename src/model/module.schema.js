import { model, models, Schema } from "mongoose";

const moduleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    order: { type: Number, required: true },
    locked: { type: Boolean, default: true }, // Default is locked
}, {
    timestamps: true
});

export const Module = models.Module || model("Module", moduleSchema)