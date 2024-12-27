import ApiErrors from "../utils/ApiErrors.js";
import { TryCatch } from "../utils/TryCatch.js";
export const admin = TryCatch(async (req, _, next) => {
    const user = req.user
    if (user.role === "admin") {
        next()
    }
    throw new ApiErrors(401, `Invalid Access`);
})