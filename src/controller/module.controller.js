import { Module } from "../model/module.schema.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

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
    const orderExist = await Module.findOne({ order })
    if (orderExist) {
        throw new ApiErrors(401, "order already exist")
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