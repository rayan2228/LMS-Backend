import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
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
    }
}, {
    timestamps: true
})

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)