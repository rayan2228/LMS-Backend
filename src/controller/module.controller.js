import { Module } from "../model/module.schema";
import ApiErrors from "../utils/ApiErrors";
import ApiResponse from "../utils/ApiResponse";
import { TryCatch } from "../utils/TryCatch";

const createModule = TryCatch(async (req, res) => {
    const { title, description, course, order, locked } = req.body
    if (!title) {
        throw new ApiErrors(401, "title is required")
    }
    if (!course) {
        throw new ApiErrors(401, "course is required")
    }
    if (!order) {
        throw new ApiErrors(401, "order is required")
    }
    const module = await Module.create({
        title,
        description,
        course,
        order,
        locked
    })
    return res.status(201).json(new ApiResponse(201, "module created succesfully", { module }))
})

export { createModule }