
import { connectDB } from "../db/index.js";
import { seedAdmin } from "./admincreate.seeder.js";
import { seedPermissions } from "./permissionSeeder.js";
import { seedRoles } from "./roleSeeder.js";
const seed = async () => {
    try {
        if (await connectDB()) {
            if (await seedPermissions()) {
                if (await seedRoles()) {
                    await seedAdmin();
                }
            }
        }
    } catch (error) {
        console.error("Error seeding:", error);
    }
}

seed();