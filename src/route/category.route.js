import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { createCategory, getAllCategories,  getCategory,  updateCategory } from "../controller/category.controller.js";
const router = express.Router()

router.route("/categories").get(getAllCategories).post(auth, admin, upload.single("thumbnail"), createCategory)
router.route("/categories/:categoryName").get(getCategory).put(auth, admin, upload.single("thumbnail"), updateCategory)


export default router
