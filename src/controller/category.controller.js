import { redis } from "../db/index.js";
import { Category } from "../model/category.schema.js";
import { Course } from "../model/course.schema.js";
import { Subcategory } from "../model/subcategory.schema.js";
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
    await redis.del("categories")
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
    const updatedCategory = await Category.findOneAndUpdate({ name: category.name }, { $set: updates }, { new: true })
    await redis.del("categories")
    return res.status(201).json(new ApiResponse(201, "category updated successfully", { categroy: updatedCategory }))
})

// Get all categories
const getAllCategories = TryCatch(async (req, res) => {
    let categories = null
    const rcategories = await redis.get("categories")

    if (rcategories) {
        categories = JSON.parse(rcategories)
    } else {
        categories = await Category.find().lean();
        // Check if the list is empty
        if (!categories || categories.length === 0) {
            throw new ApiErrors(404, "No categories found", {});
        }
        redis.set("categories", JSON.stringify(categories))
    }


    res.json(new ApiResponse(200, "All category list", { categories }));
});

// Get a specific category by name
const getCategory = TryCatch(async (req, res) => {
    const { categoryName } = req.params;

    // Validate categoryName
    if (!categoryName || typeof categoryName !== "string") {
        throw new ApiErrors(400, "Invalid category name", {});
    }

    const category = await Category.findOne({ name: categoryName });

    if (!category) {
        throw new ApiErrors(404, `Category "${categoryName}" not found`, {});
    }

    res.json(new ApiResponse(200, `${categoryName} category data`, { category }));
});


const deleteAllCategories = TryCatch(async (req, res) => {
    const { categories } = req.body;

    // Check if categories are provided and is a non-empty array
    if (!Array.isArray(categories) || categories.length === 0) {
        throw new ApiErrors(404, "No categories selected", {});
    }

    // Find subcategories associated with the provided categories
    const subcategories = await Subcategory.find({ category: { $in: categories } });

    if (subcategories.length > 0) {
        // Update subcategories to remove references to these categories
        await Subcategory.updateMany(
            { category: { $in: categories } },
            { $pull: { category: { $in: categories } } }
        );
        await Course.updateMany(
            { category: { $in: categories } },
            { $pull: { category: { $in: categories } } }
        );
    }

    // Delete the categories
    const deleteResult = await Category.deleteMany({ _id: { $in: categories } });
    await redis.del("categories")
    // Respond with the result
    res.json(new ApiResponse(200, "selected categories are deleted", { deletedCount: deleteResult.deletedCount }));
});


const deleteCategory = TryCatch(async (req, res) => {
    const { categoryId } = req.params;

    // Validate categoryName
    if (!categoryId) {
        throw new ApiErrors(400, "Invalid category id", {});
    }
    // Find subcategories associated with the provided categories
    const subcategories = await Subcategory.find({ category: { $in: categoryId } });

    if (subcategories.length > 0) {
        // Update subcategories to remove references to these categories
        await Subcategory.updateMany(
            { category: { $in: categoryId } },
            { $pull: { category: { $in: categoryId } } }
        );
        await Course.updateMany(
            { subcategory: { $in: categoryId } },
            { $pull: { category: { $in: categoryId } } }
        );
    }
    // Attempt to find and delete the category
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
        throw new ApiErrors(404, `Category  not found`, {});
    }
    await redis.del("categories")
    res.json(new ApiResponse(200, `Category deleted successfully`, {}));
});



export { createCategory, updateCategory, getAllCategories, getCategory, deleteAllCategories, deleteCategory }