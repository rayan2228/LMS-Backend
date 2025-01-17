import mongoose, { Schema, model } from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Role name (e.g., "admin", "instructor", "student")
    permissions: [{ type: String, required: true }], // List of permissions for this role
    description: { type: String }, // Optional description of the role
    dateCreated: { type: Date, default: Date.now }, // When the role was created
});

export const Role = mongoose.models.Role || model('Role', roleSchema);
