import { model, models, Schema } from "mongoose";

const assignmentSchema = new Schema({
    title: { type: String, required: true },
    instructions: { type: String },
    dueDate: { type: Date },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    Course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    submissions: [
        {
            student: { type: Schema.Types.ObjectId, ref: 'User' },
            fileUrl: String,
            grade: { type: Number },
            feedback: { type: String },
            submittedAt: { type: Date, default: Date.now },
        },
    ],
}, {
    timestamps: true
});
export const Assignment = models.Module || model("Assignment", assignmentSchema)