import mongoose, { Schema, model } from "mongoose";
const roleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Role name (e.g., "admin", "instructor", "student")
    permissions: [{ type: Schema.Types.ObjectId, ref:"Permission", required: true }], // List of permissions for this role
    description: { type: String }, // Optional description of the role
}, {
    timestamps: true
});

export const Role = mongoose.models.Role || model('Role', roleSchema);
