import { Subcategory } from "../model/subcategory.schema.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createSubcategory = TryCatch(async (req, res) => {
    let { name, slug, category } = req.body
    const updates = {};
    if (req.file) {
        const thumbnail = req.file;
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "subcategory");
        updates.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        };
    }

    if (!name) {
        throw new ApiErrors(400, "subcategory name is required")
    }
    if (!category?.length) {
        throw new ApiErrors(400, "parent category is required")
    }
    const isName = await Subcategory.findOne({ name })
    if (isName) {
        throw new ApiErrors(400, "subcategory name must be unique")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    updates.name = name
    updates.slug = slug
    updates.category = category
    const subcategory = await Subcategory.create(updates)
    return res.status(201).json(new ApiResponse(201, "subcategory created successfully", { subcategory }))
})
export { createSubcategory }