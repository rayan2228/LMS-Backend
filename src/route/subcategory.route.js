import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { createSubcategory } from "../controller/subcategory.controller.js";
const router = express.Router()

router.route("/subcategories").post(auth, admin, upload.single("thumbnail"), createSubcategory)


export default router
