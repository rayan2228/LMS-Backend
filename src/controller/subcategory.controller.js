import { redis } from "../db/index.js";
import { Course } from "../model/course.schema.js";
import { Subcategory } from "../model/subcategory.schema.js";
import { cloudinaryDelete, cloudinaryUpload } from "../service/cloudinary.js";
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
    category?.push("677918b65917dd2ce607a32f")
    updates.name = name
    updates.slug = slug
    updates.category = category
    const subcategory = await Subcategory.create(updates)
    await redis.del("subcategories")
    return res.status(201).json(new ApiResponse(201, "subcategory created successfully", { subcategory }))
})

const updatesubcategory = TryCatch(async (req, res) => {
    let { name, slug } = req.body
    const { subcategoryName } = req.params
    const subcategory = await Subcategory.findOne({ name: subcategoryName })
    if (!subcategory) {
        throw new ApiErrors(400, "no subcategory found")
    }
    const updates = {};
    if (req.file) {
        const thumbnail = req.file;
        if (subcategory.thumbnail.public_id) {
            await cloudinaryDelete(category.thumbnail.public_id);
        }
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, category.name, "subcategory");
        updates.thumbnail = {
            public_id: cloudinaryResult.uploadResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        };
    }
    if (!name) {
        throw new ApiErrors(400, "subcategory name is required")
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
    const updatedSubcategory = await Subcategory.findOneAndUpdate({ name: subcategory.name }, { $set: updates }, { new: true })
    await redis.del("subcategories")
    return res.status(201).json(new ApiResponse(201, "subcategory updated successfully", { subcategory: updatedSubcategory }))
})

// Get all categories
const getAllSubcategories = TryCatch(async (req, res) => {
    let subcategories = null
    const rsubcategories = await redis.get("subcategories")

    if (rsubcategories) {
        subcategories = JSON.parse(rsubcategories)
    } else {
        subcategories = await Subcategory.find().populate("category");;
        if (!subcategories || subcategories.length === 0) {
            throw new ApiErrors(404, "No subcategories found", {});
        }
        redis.set("subcategories", JSON.stringify(subcategories))
    }

    // Check if the list is empty

    res.json(new ApiResponse(200, "All subcategory list", { subcategories }));
});

// Get a specific category by name
const getSubcategory = TryCatch(async (req, res) => {
    const { subcategoryName } = req.params;

    // Validate categoryName
    if (!subcategoryName || typeof subcategoryName !== "string") {
        throw new ApiErrors(400, "Invalid subcategory name", {});
    }

    const subcategory = await Subcategory.findOne({ name: subcategoryName });

    if (!subcategory) {
        throw new ApiErrors(404, `subcategory "${subcategoryName}" not found`, {});
    }

    res.json(new ApiResponse(200, `${subcategoryName} subcategory data`, { subcategory }));
});


const deleteAllSubcategories = TryCatch(async (req, res) => {
    const { subcategories } = req.body;

    // Check if categories are provided and is a non-empty array
    if (!Array.isArray(subcategories) || subcategories.length === 0) {
        throw new ApiErrors(404, "No subcategories selected", {});
    }

    // Find subcategories associated with the provided categories
    const courses = await Course.find({ subcategory: { $in: subcategories } });

    if (courses.length > 0) {
        // Update subcategories to remove references to these categories
        await Course.updateMany(
            { subcategory: { $in: subcategories } },
            { $pull: { category: { $in: subcategories } } }
        );
    }

    // Delete the categories
    const deleteResult = await Subcategory.deleteMany({ _id: { $in: subcategories } });
    await redis.del("subcategories")
    // Respond with the result
    res.json(new ApiResponse(200, "selected subcategories are deleted", { deletedCount: deleteResult.deletedCount }));
});


const deleteSubcategory = TryCatch(async (req, res) => {
    const { subcategoryId } = req.params;

    // Validate categoryName
    if (!subcategoryId) {
        throw new ApiErrors(400, "Invalid category id", {});
    }
    // Find subcategories associated with the provided categories
    const courses = await Course.find({ subcategory: { $in: subcategories } });

    if (courses.length > 0) {
        // Update subcategories to remove references to these categories
        await Course.updateMany(
            { subcategory: { $in: subcategoryId } },
            { $pull: { category: { $in: subcategoryId } } }
        );
    }
    // Attempt to find and delete the category
    const subcategory = await Subcategory.findByIdAndDelete(subcategoryId);

    if (!subcategory) {
        throw new ApiErrors(404, `subcategory not found`, {});
    }
    await redis.del("subcategories")
    res.json(new ApiResponse(200, `subcategory deleted successfully`, {}));
});

export { createSubcategory, getAllSubcategories, getSubcategory, deleteAllSubcategories, deleteSubcategory, updatesubcategory }