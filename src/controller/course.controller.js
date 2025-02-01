import { Course } from "../model/course.schema.js";
import { cloudinaryUpload } from "../service/cloudinary.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCourse = TryCatch(async (req, res) => {
    let { title, slug, level, description, category, discountType, price, subcategory, discountValue, topics } = req.body

    
    if ([title, description, category, price, subcategory, topics].some(el => el === "")) {
        throw new ApiErrors(400, "All fields are required")
    }
    if (slug) {
        const slugExist = await Course.findOne({ slug })
        if (slugExist) {
            throw new ApiErrors(400, "slug already exist")
        }
    } else {
        slug = title.replaceAll(" ", "-").toLowerCase() + Date.now()

    }
    const thumbnail = req.file
    if (!thumbnail) {
        throw new ApiErrors(400, "thumbnail is required")
    }
    const cloudinaryResult = await cloudinaryUpload(thumbnail.path, slug, "course")
    const course = await Course.create({
        title,
        slug,
        level,
        description,
        category,
        subcategory,
        price,
        discountType,
        discountValue,
        thumbnail: {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url
        },
        topics
    })
    return res.status(201).json(new ApiResponse(201, "course created succesfully", { course }))
})


export { createCourse }