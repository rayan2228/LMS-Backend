import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { createPermission, getPermissions } from "../controller/permission.controller.js";

const router = express.Router()

router.route("/permissions").get(auth, getPermissions).post(auth, createPermission)


export default router