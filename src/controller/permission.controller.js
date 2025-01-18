import { Permission } from "../model/permission.schema.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createPermission = TryCatch(async (req, res) => {
    const { name, description } = req.body
    if (!name) {
        throw new ApiErrors(400, "Permission name is required");
    }
    // Check if permission already exists
    const permissionExists = await Permission.findOne({ name })
    if (permissionExists) {
        throw new ApiErrors(400, "Permission already exists");
    }
    const permission = await Permission.create({ name, description })
    return res.status(201).json(new ApiResponse(201, "Permission created successfully", { permission }));
})

const getPermissions = TryCatch(async (req, res) => {
    const permissions = await Permission.find()
    return res.status(200).json(new ApiResponse(200, "Permissions retrieved successfully", { permissions }));
})

export { createPermission, getPermissions };