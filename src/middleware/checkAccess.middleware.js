import { TryCatch } from "../utils/TryCatch";

function checkAccess(requiredRoles = [], requiredPermissions = []) {
    return TryCatch(async (req, res, next) => {
        const user = req.user

        const userRoles = user.roles.map((role) => role.name);
        const rolePermissions = user.roles.reduce((acc, role) => acc.concat(role.permissions), []);

        // Role check
        const hasRole = requiredRoles.length === 0 || requiredRoles.some((role) => userRoles.includes(role));

        // Permission check
        const hasPermissions =
            requiredPermissions.length === 0 ||
            requiredPermissions.every((permission) => rolePermissions.includes(permission));

        if (!hasRole || !hasPermissions) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    })
}

