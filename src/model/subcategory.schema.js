import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    thumbnail: {
        public_id: String,
        url: String
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }]
}, {
    timestamps: true
})

export const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema)