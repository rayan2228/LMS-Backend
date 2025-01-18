import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { createRole, getRoles } from "../controller/role.controller.js";

const router = express.Router()

router.route("/roles").get(auth, getRoles).post(auth, createRole)


export default router
