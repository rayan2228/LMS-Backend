import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: { type: String, required: true },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    level: {
        type: String,
        enum: ["noob", "pro", "expert"],
        default: "noob"
    },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    subcategory: [{ type: Schema.Types.ObjectId, ref: 'Subcategory', required: true }],
    price: { type: Number, default: 0, required: true },
    discountType: { type: String, enum: ["percentage", "fixed"] , default: "fixed" },
    discountValue: { type: Number, default: 0 },
    thumbnail: {
        public_id: String,
        url: String
    },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic', required: true, max: 5 }]
}, {
    timestamps: true
});


courseSchema.pre("save", async function (next) {
    if (this.$isNew) {
        this.category.push("677918b65917dd2ce607a32f")
        this.subcategory.push("677918b65917dd2ce607a32f")
        next()
    }
    next()
})
export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)