import express from "express";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createCourse } from "../controller/course.controller.js";
const router = express.Router()

router.route("/courses").post(auth, upload.single("thumbnail"), createCourse)


export default router
