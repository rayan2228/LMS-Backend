
import { TryCatch } from "../utils/TryCatch.js";

export function checkAccess(requiredPermissions = []) {
    return TryCatch(async (req, res, next) => {
        const user = req.user
        const rolePermissions = user.role.map((role) => role.permissions).flat().map((permission) => permission.name);

        // Permission check
        if (requiredPermissions.length) {
            const hasPermissions = requiredPermissions.every((permission) => rolePermissions.includes(permission));
            if (!hasPermissions) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }
        next();
    })
}

