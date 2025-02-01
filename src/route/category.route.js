import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controller/category.controller.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = express.Router()

router.route("/categories").get(getAllCategories).post(auth,checkAccess(["create_categories"]), upload.single("thumbnail"), createCategory).delete(auth,checkAccess(["delete_categories"]), deleteAllCategories)
router.route("/categories/:categoryName").get(getCategory).put(auth, checkAccess(["edit_categories"]), upload.single("thumbnail"), updateCategory)
router.route("/categories/:categoryId").delete(auth,checkAccess("delete_categories"), deleteCategory)


export default router
