import { Permission } from "../model/permission.schema.js";
import { Role } from "../model/role.schema.js";


export const seedRoles = async () => {
    try {

        // Fetch all permissions
        const permissions = await Permission.find();
        // Create roles with permissions
        const roles = [
            {
                name: "Admin",
                description: "Full access to all permissions for high-level control.",
                permissions: permissions.map((perm) => perm._id) // Assign all permissions
            },
            {
                name: "Editor",
                description:
                    "Content-focused role with permissions for managing categories, subcategories, and coupons but limited in financial and structural changes.",
                permissions: permissions
                    .filter((perm) =>
                        [
                            "create_courses",
                            "edit_courses",
                            "delete_courses",
                            "create_modules",
                            "edit_modules",
                            "delete_modules",
                            "manage_content",
                            "view_enrollments",
                            "create_quizzes",
                            "edit_quizzes",
                            "delete_quizzes",
                            "view_reviews",
                            "respond_to_reviews",
                            "moderate_reviews",
                            "send_notifications",
                            "view_notifications",
                            "manage_notifications",
                            "view_reports",
                            "download_reports",
                            "create_categories",
                            "edit_categories",
                            "delete_categories",
                            "view_categories",
                            "create_subcategories",
                            "edit_subcategories",
                            "delete_subcategories",
                            "view_subcategories",
                            "create_orders",
                            "view_orders",
                            "update_order_status"
                        ].includes(perm.name)
                    )
                    .map((perm) => perm._id)
            },
            {
                name: "Instructor",
                description:
                    "Limited permissions, primarily focused on viewing and interacting with relevant data.",
                permissions: permissions
                    .filter((perm) =>
                        [
                            "create_courses",
                            "edit_courses",
                            "create_modules",
                            "edit_modules",
                            "manage_content",
                            "view_enrollments",
                            "create_quizzes",
                            "edit_quizzes",
                            "view_reviews",
                            "respond_to_reviews",
                            "send_notifications",
                            "view_notifications",
                            "view_categories",
                            "view_subcategories",
                            "view_orders"
                        ].includes(perm.name)
                    )
                    .map((perm) => perm._id)
            }
        ];

        await Role.insertMany(roles);
        console.log("Roles seeded successfully!");
        return true;
    } catch (error) {
        console.error("Error seeding roles:", error);
        return false
    }
};


