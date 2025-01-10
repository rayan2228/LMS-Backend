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


subcategorySchema.pre("save", async function(next) {
    if(this.$isNew) {
    this.category.push("677918b65917dd2ce607a32f")
    next()
}
next()
})

export const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema)