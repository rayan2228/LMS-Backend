import jwt from "jsonwebtoken";
import ApiErrors from "./ApiErrors.js";
import { redis } from "../db/index.js";

const verifyToken = async (token, signature, type = "access") => {
    if (!token) {
        throw new ApiErrors(401, `${type.charAt(0).toUpperCase() + type.slice(1)} token is required`);
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, signature);
    } catch (err) {
        throw new ApiErrors(401, `Invalid ${type} token`);
    }
    const ruser = await redis.get(decodedToken.username) 
    
    const user = JSON.parse(ruser)
    if (!user) {
        throw new ApiErrors(401, "User not found");
    }

    return user; // Return the authenticated user for further use
};

const extractToken = (req, type = "access") => {
    if (type === "access") {
        return req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    } else if (type === "refresh") {
        return req.cookies.refreshToken || req.headers.refreshToken || req.body.refreshToken;
    }
    throw new Error("Invalid token type");
};

export { verifyToken, extractToken };
