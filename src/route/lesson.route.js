import e from "express";
import { createLesson } from "../controller/lesson.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = e.Router();
router.route("/lessons").post(auth, checkAccess(["create_modules"]), createLesson)
export default router;