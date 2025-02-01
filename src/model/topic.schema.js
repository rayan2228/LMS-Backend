import mongoose, { model, Schema } from "mongoose";

const topicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
})

export const Topic = mongoose.models.Topic || model("Topic", topicSchema) 