import { model, models, Schema } from "mongoose";

const quizSchema = new Schema({
    title: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String }],
            correctAnswer: { type: Number, required: true }, // Index of the correct option
        },
    ],
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
}, {
    timestamps: true
});
export const Quiz = models.Module || model("Quiz", quizSchema)