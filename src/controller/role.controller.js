import { Role } from "../model/role.schema.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TryCatch } from "../utils/TryCatch.js";

const createRole = TryCatch(async (req, res) => {
    const { name, permissions } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!permissions || permissions.length === 0) {
        return res.status(400).json({ message: "Permissions are required" });
    }
    const role = await Role.create({ name, permissions });
    return res.status(201).json(new ApiResponse(201, "Role created successfully", { role }));
})

const getRoles = TryCatch(async (req, res) => {
    const roles = await Role.find().populate("permissions", "name");
    return res.status(200).json(new ApiResponse(200, "Roles retrieved successfully", { roles }));
})

export { createRole, getRoles };