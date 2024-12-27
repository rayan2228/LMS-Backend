import { Subcategory } from "../model/subcategory.schema.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createSubcategory = TryCatch(async (req, res) => {
    let { name, slug } = req.body
    if (!name) {
        throw new ApiErrors(400, "subcategory name is required")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    const isName = await Subcategory.findOne({ name })
    if (isName) {
        throw new ApiErrors(400, "subcategory name must be unique")
    }
    const subcategory = await Subcategory.create({ name, slug })
    return res.status(201).json(new ApiResponse(201, "subsubcategory created successfully", { subcategory }))
})

export { createSubcategory }