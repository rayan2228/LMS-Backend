import { Category } from "../model/category.schema.js";
import { cloudinaryDelete, cloudinaryUpload } from "../service/cloudinary.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCategory = TryCatch(async (req, res) => {
    let { name, slug } = req.body
    const updates = {};
    if (req.file) {
        const thumbnail = req.file;
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "category");
        updates.thumbnail = {
            public_id: cloudinaryResult.uploadResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        };
    }
    if (!name) {
        throw new ApiErrors(400, "category name is required")
    }
    const isName = await Category.findOne({ name })
    if (isName) {
        throw new ApiErrors(400, "category name must be unique")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    updates.name = name
    updates.slug = slug
    const category = await Category.create(updates)
    return res.status(201).json(new ApiResponse(201, "category created successfully", { category }))
})

const updateCategory = TryCatch(async (req, res) => {
    let { name, slug } = req.body
    const { categoryName } = req.params
    const category = await Category.findOne({ name: categoryName })
    if (!category) {
        throw new ApiErrors(400, "no category found")
    }
    const updates = {};
    if (req.file) {
        const thumbnail = req.file;
        if (category.thumbnail.public_id) {
            await cloudinaryDelete(category.thumbnail.public_id);
        }
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, category.name, "category");
        console.log("asas");
        updates.thumbnail = {
            public_id: cloudinaryResult.uploadResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        };
    }
    if (!name) {
        throw new ApiErrors(400, "category name is required")
    }
    const isName = await Category.findOne({ name })
    if (isName) {
        throw new ApiErrors(400, "category name must be unique")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    updates.name = name
    updates.slug = slug
    const updateedCategory = await Category.findOneAndUpdate({ name: category.name }, { $set: updates }, { new: true })
    return res.status(201).json(new ApiResponse(201, "category created successfully", { categroy: updateedCategory }))
})

const getAllCategories = TryCatch(async (req, res) => {
    const categories = await Category.find()
    res.json(new ApiResponse(200, "all category list", { categories }))
})
const getCategory = TryCatch(async (req, res) => {
    const category = await Category.findOne({ name: req.params.categoryName })
    if (!category) {
        throw new ApiErrors(404, "no data founded", {})
    }
    res.json(new ApiResponse(200, `${req.params.categoryName} category data`, { category }))
})


export { createCategory, updateCategory, getAllCategories, getCategory }