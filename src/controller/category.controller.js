import { Category } from "../model/category.schema.js";
import { cloudinaryUpload } from "../service/cloudinary.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCategory = TryCatch(async (req, res) => {
    const updates = {};
    if (req.file) {
        const thumbnail = req.file;
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "category");
        updates.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        };
    }
    let { name, slug } = req.body
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
    const category = await Category.create({ updates })
    return res.status(201).json(new ApiResponse(201, "category created successfully", { category }))
})

export { createCategory }