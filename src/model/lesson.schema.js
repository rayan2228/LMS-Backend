import mongoose, { model , Schema } from "mongoose";

const lessonSchema = new Schema({
    title: { type: String, required: [true, "lesson is required"] },
    content: { type: String },
    videoUrl: String,
    resources: [{ type: String }], // Files or links to resources
    module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    preview: { type: Boolean, default: false }
}, {
    timestamps: true
});
export const Lesson = mongoose.models.Module || model("Lesson", lessonSchema)