import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { createPermission, getPermissions } from "../middleware/permission.controller.js";

const router = express.Router()

router.route("/permissions").get(auth, getPermissions).post(auth, createPermission)


export default router
