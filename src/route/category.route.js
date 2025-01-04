import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controller/category.controller.js";
const router = express.Router()

router.route("/categories").get(getAllCategories).post(auth, admin, upload.single("thumbnail"), createCategory).delete(auth, admin, deleteAllCategories)
router.route("/categories/:categoryName").get(getCategory).put(auth, admin, upload.single("thumbnail"), updateCategory)
router.route("/categories/:categoryId").delete(auth, admin, deleteCategory)


export default router
