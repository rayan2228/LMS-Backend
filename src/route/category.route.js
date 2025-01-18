import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controller/category.controller.js";
const router = express.Router()

router.route("/categories").get(getAllCategories).post(auth, upload.single("thumbnail"), createCategory).delete(auth, deleteAllCategories)
router.route("/categories/:categoryName").get(getCategory).put(auth, upload.single("thumbnail"), updateCategory)
router.route("/categories/:categoryId").delete(auth, deleteCategory)


export default router
