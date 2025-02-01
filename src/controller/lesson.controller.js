import { Lesson } from "../model/lesson.schema.js";
import { TryCatch } from "../utils/TryCatch.js";

const createLesson = TryCatch(async (req, res) => {
    const { title, content, videoUrl, resources, module, preview } = req.body
    if (!title) {
        throw new ApiErrors(401, "title is required")
    }
    if (!module) {
        throw new ApiErrors(401, "module is required")
    }
    const lesson = await Lesson.create({
        title,
        content,
        videoUrl,
        resources,
        module,
        preview
    })
    return res.status(201).json(new ApiResponse(201, "lesson created succesfully", { lesson }))
})

export { createLesson }