import mongoose, { Schema, model } from "mongoose";

const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Role name (e.g., "admin", "instructor", "student")
    description: { type: String }, // Optional description of the role
}, {
    timestamps: true
});

export const Permission = mongoose.models.Permission || model('Permission', permissionSchema);
