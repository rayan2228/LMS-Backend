import e from "express";
import { auth } from "../middleware/auth.middleware.js";
import { createModule } from "../controller/module.controller.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = e.Router();
router.route("/modules").post(auth,checkAccess(["create_modules"]), createModule)
export default router;