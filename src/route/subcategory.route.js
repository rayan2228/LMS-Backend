import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createSubcategory, deleteAllSubcategories, deleteSubcategory, getAllSubcategories, getSubcategory, updatesubcategory } from "../controller/subcategory.controller.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = express.Router()

router.route("/subcategories").get(getAllSubcategories).post(auth, checkAccess(["create_subcategories"]), upload.single("thumbnail"), createSubcategory).delete(auth, checkAccess(["delete_subcategories"]), deleteAllSubcategories)
router.route("/subcategories/:subcategoryName").get(getSubcategory).put(auth, checkAccess(["edit_subcategories"]), upload.single("thumbnail"), updatesubcategory)
router.route("/subcategories/:subcategoryId").delete(auth, checkAccess(["delete_subcategories"]), deleteSubcategory)

export default router
