import mongoose, { Schema } from "mongoose";
import { validateEmail } from "../helper/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ACCESSSTOKEN_EXPRIE, ACCESSSTOKEN_SIGNATURE, REFRESHTOKEN_EXPRIE, REFRESHTOKEN_SIGNATURE, VERIFICATION_SIGNATURE } from "../constant.js";
const userSchema = new Schema({
    displayname: {
        type: String,
        required: [true, "displayname is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validateEmail,
            message: "Please fill a valid email address",
        },
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    },
    bio: String,
    emailVerified: Date,
    passwordReset: String,
    refreshToken: String
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
})


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.verificationToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, VERIFICATION_SIGNATURE, {
        expiresIn: "5m"
    })
}
userSchema.methods.accessTokenGenerate = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    }, ACCESSSTOKEN_SIGNATURE, {
        expiresIn: ACCESSSTOKEN_EXPRIE
    })
}
userSchema.methods.refreshTokenGenerate = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    }, REFRESHTOKEN_SIGNATURE, {
        expiresIn: REFRESHTOKEN_EXPRIE
    })
}



export const User = mongoose.models.User || mongoose.model("User", userSchema)

