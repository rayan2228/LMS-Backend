import { ADMIN_DISPLAYNAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERNAME } from "../constant.js";
import { connectDB } from "../db/index.js";
import { Role } from "../model/role.schema.js";
import { User } from "../model/user.schema.js";

export const seedAdmin = async () => {
    try {
        await connectDB();
        // Fetch all permissions
        const role = await Role.findOne({ name: "Admin" });
        // Create roles with permissions

        await User.create({
            displayname: ADMIN_DISPLAYNAME,
            username: ADMIN_USERNAME,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: role._id
        });

        console.log("Admin seeded successfully!");
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();