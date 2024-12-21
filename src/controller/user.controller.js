import { REFRESHTOKEN_SIGNATURE, VERIFICATION_SIGNATURE } from "../constant.js";
import { validatePassword } from "../helper/index.js";
import { User } from "../model/user.schema.js";
import { sendMail } from "../service/sendMail.js";
import { verificationMail } from "../template/mail/verificationMail.js";
import jwt from "jsonwebtoken";
import ApiErrors from "../utils/ApiErrors.js";
import { TryCatch } from "../utils/TryCatch.js";
import ApiResponse from "../utils/ApiResponse.js";
import { extractToken, verifyToken } from "../utils/tokenChecker.js";
import { cloudinaryUpload } from "../service/cloudinary.js";

const generateTokens = async (_id) => {
    const user = await User.findById(_id);
    const accessToken = user.accessTokenGenerate();
    const refreshToken = user.refreshTokenGenerate();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
};

const validateFields = (fields) => {
    if (fields.some((field) => !field?.trim())) {
        throw new ApiErrors(400, "All fields are required");
    }
};

const createUser = TryCatch(async (req, res) => {
    const { displayname, username, email, password } = req.body;
    validateFields([displayname, username, email, password]);

    const isEmailFound = await User.findOne({ email });
    if (isEmailFound) return res.status(400).json({ message: "Email already in use" });

    const isUsernameFound = await User.findOne({ username });
    if (isUsernameFound) throw new ApiErrors(400, "Username already in use");

    if (!validatePassword(password)) {
        throw new ApiErrors(
            400,
            "Password must contain at least one letter, one number, one special character, and be at least 8 characters long"
        );
    }

    const createdUser = await User.create({ displayname, username, email, password });
    const user = await User.findById(createdUser._id).select("-password");

    const token = user.verificationToken();
    sendMail(user.email, "Verification Mail", "", verificationMail(user.displayname, token));

    return res.status(201).json(new ApiResponse(201, "User created successfully", { user }));
});

const emailVerification = TryCatch(async (req, res) => {
    const { token } = req.params;
    if (!token) throw new ApiErrors(400, "Invalid token");

    const decoded = jwt.verify(token, VERIFICATION_SIGNATURE);
    const user = await User.findById(decoded._id);
    if (!user) throw new ApiErrors(400, "Invalid token");

    await User.findByIdAndUpdate(decoded._id, { emailVerified: Date.now() }, { new: true });
    return res.status(200).send("Email verified successfully");
});

const login = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    validateFields([email, password]);

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        throw new ApiErrors(400, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const responseUser = { ...user._doc, password: undefined };
    const options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict",
    };

    res.cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Login successful", { user: responseUser, accessToken, refreshToken }));
});

const updateProfile = TryCatch(async (req, res) => {
    const updates = {};
    if (req.file) {
        const avatar = req.file;
        const cloudinaryResult = await cloudinaryUpload(avatar.path, req.user.username, "avatar");
        updates.avatar = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        };
    }
    if (req.body.displayname) updates.displayname = req.body.displayname;
    if (req.body.bio) updates.bio = req.body.bio;

    if (Object.keys(updates).length === 0) throw new ApiErrors(400, "No updates provided");

    const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true });
    return res.json(new ApiResponse(200, "Profile updated", { user }));
});

const logout = TryCatch(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    res.clearCookie("accessToken").clearCookie("refreshToken");
    return res.json(new ApiResponse(200, "Logout successful"));
});

const changePassword = TryCatch(async (req, res) => {
    const { newPassword, oldPassword } = req.body;
    validateFields([newPassword, oldPassword]);

    const user = await User.findById(req.user._id);
    if (!(await user.matchPassword(oldPassword))) throw new ApiErrors(401, "Invalid old password");

    if (!validatePassword(newPassword)) {
        throw new ApiErrors(
            400,
            "Password must contain at least one letter, one number, one special character, and be at least 8 characters long"
        );
    }

    user.password = newPassword;
    await user.save();

    return res.json(new ApiResponse(200, "Password updated successfully"));
});

const refreshAccessToken = TryCatch(async (req, res) => {
    const token = extractToken(req, "refresh");
    const user = await verifyToken(token, REFRESHTOKEN_SIGNATURE, "refresh");
    const accessToken = await user.accessTokenGenerate();
    const options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict",
    };
    res.cookie("accessToken", accessToken, options).json(new ApiResponse(200, "Access token refreshed", { accessToken }));
});

export { createUser, emailVerification, login, updateProfile, logout, changePassword, refreshAccessToken };