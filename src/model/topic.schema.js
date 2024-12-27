import { model, models, Schema } from "mongoose";

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

export const Topic = models.Topic || model("Topic", topicSchema) 