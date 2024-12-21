import { ACCESSSTOKEN_SIGNATURE } from "../constant.js";
import { extractToken, verifyToken } from "../utils/tokenChecker.js";
import { TryCatch } from "../utils/TryCatch.js";
export const auth = TryCatch(async (req, _, next) => {
    const token = extractToken(req, "access")
    const user = await verifyToken(token, ACCESSSTOKEN_SIGNATURE, "access")
    req.user = user
    next()
})