import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createSubcategory, deleteAllSubcategories, deleteSubcategory, getAllSubcategories, getSubcategory, updatesubcategory } from "../controller/subcategory.controller.js";
const router = express.Router()

router.route("/subcategories").get(getAllSubcategories).post(auth, upload.single("thumbnail"), createSubcategory).delete(auth, deleteAllSubcategories)
router.route("/subcategories/:subcategoryName").get(getSubcategory).put(auth, upload.single("thumbnail"), updatesubcategory)
router.route("/subcategories/:subcategoryId").delete(auth, deleteSubcategory)

export default router
