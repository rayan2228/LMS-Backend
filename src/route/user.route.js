import express from "express";
import { changePassword, createRoleUser, createUser, emailVerification, login, logout, refreshAccessToken, updateProfile } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAccess } from "../middleware/checkAccess.middleware.js";
const router = express.Router()

router.route("/users").get().post(createUser)
router.route("/users/login").post(login)
router.route("/users/create-role-user").post(auth, checkAccess(["manage_roles"]), createRoleUser)
router.route("/users/update").post(auth, upload.single("avatar"), updateProfile)
router.get("/users/verify/:token", emailVerification)
router.get("/users/logout", auth, logout)
router.post("/users/changepassword", auth, changePassword)
router.post("/users/refresh", auth, refreshAccessToken)

export default router
