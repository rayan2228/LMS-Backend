import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { createSubcategory, deleteAllSubcategories, deleteSubcategory, getAllSubcategories, getSubcategory, updatesubcategory } from "../controller/subcategory.controller.js";
const router = express.Router()

router.route("/subcategories").get(getAllSubcategories).post(auth, admin, upload.single("thumbnail"), createSubcategory).delete(auth, admin, deleteAllSubcategories)
router.route("/categories/:categoryName").get(getSubcategory).put(auth, admin, upload.single("thumbnail"), updatesubcategory)
router.route("/categories/:categoryId").delete(auth, admin, deleteSubcategory)

export default router
