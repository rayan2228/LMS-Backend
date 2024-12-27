import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: { type: String, required: true },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    subcategory: [{ type: Schema.Types.ObjectId, ref: 'Subcategory', required: true }],
    price: { type: Number, default: 0, required: true },
    discountType: { type: String, enum: ["percentage", "fixed"] },
    discountValue: { type: Number },
    thumbnail: {
        public_id: String,
        url: String
    },
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic', required: true, max: 5 }]
}, {
    timestamps: true
});

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)