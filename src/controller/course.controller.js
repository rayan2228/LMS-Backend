import { TryCatch } from "../utils/TryCatch.js";

const createCourse = TryCatch(async (req, res) => {
    const { title, slug, level, description, category, discountType, price, subcategory, discountValue, thumbnail, modules, studentsEnrolled } = req.body
})


export { createCourse }