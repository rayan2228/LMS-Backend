import e from "express";
import { createTopics } from "../controller/topics.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = e.Router();

router.route("/topics").post(auth, checkAccess(["create_modules"]), createTopics)
export default router;