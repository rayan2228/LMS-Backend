import { model, models, Schema } from "mongoose";

const questionSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    answered: { type: Boolean, default: false },
    answer: { type: String },
    dateAnswered: { type: Date },
}, {
    timestamps: true
});
export const Question = models.Module || model("Question", questionSchema)