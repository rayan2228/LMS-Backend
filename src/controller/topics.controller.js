import { Topic } from "../model/topic.schema.js";
import ApiErrors from "../utils/ApiErrors.js";
import { TryCatch } from "../utils/TryCatch.js";

const createTopics = TryCatch(async (req, res) => {
    console.log(req.body);
    
    if (!req.body.name) {
        throw new ApiErrors(401, "topic name is required")
    }
    const topicExist = await Topic.findOne({ name: req.body.name })
    if (topicExist) {
        throw new ApiErrors(401, "topic already exist")
    }
    const topic = await Topic.create({ name: req.body.name })
    return res.status(201).json({ message: "topic created successfully", topic })
})

export { createTopics }