import { ADMIN_EMAIL } from "../constant.js";
import { Permission } from "../model/permission.schema.js";
import { Role } from "../model/role.schema.js";
import { User } from "../model/user.schema.js";

// Define permissions
const permissions = [
    { "name": "manage_users", "description": "Manage all user accounts." },
    { "name": "create_courses", "description": "Create new courses." },
    { "name": "edit_courses", "description": "Edit existing courses." },
    { "name": "delete_courses", "description": "Delete existing courses." },
    { "name": "create_modules", "description": "Create new modules for courses." },
    { "name": "edit_modules", "description": "Edit existing course modules." },
    { "name": "delete_modules", "description": "Delete existing course modules." },
    { "name": "manage_content", "description": "Oversee and manage all LMS-related content." },
    { "name": "enroll_students", "description": "Enroll students in courses." },
    { "name": "view_enrollments", "description": "View student enrollments." },
    { "name": "manage_enrollments", "description": "Manage student enrollments." },
    { "name": "create_quizzes", "description": "Create new quizzes for courses." },
    { "name": "edit_quizzes", "description": "Edit existing quizzes." },
    { "name": "delete_quizzes", "description": "Delete quizzes from courses." },
    { "name": "view_reviews", "description": "View reviews left by students." },
    { "name": "respond_to_reviews", "description": "Respond to reviews." },
    { "name": "moderate_reviews", "description": "Moderate student reviews for appropriateness." },
    { "name": "send_notifications", "description": "Send system-wide notifications to users." },
    { "name": "view_notifications", "description": "View system notifications." },
    { "name": "manage_notifications", "description": "Manage notification settings and details." },
    { "name": "view_settings", "description": "View system settings." },
    { "name": "manage_settings", "description": "Manage system configuration and settings." },
    { "name": "view_roles", "description": "View all available roles." },
    { "name": "manage_roles", "description": "Manage roles and their associated permissions." },
    { "name": "view_reports", "description": "Access reports and analytics data." },
    { "name": "download_reports", "description": "Download reports and analytics data." },
    { "name": "create_coupons", "description": "Create new discount coupons." },
    { "name": "edit_coupons", "description": "Edit existing discount coupons." },
    { "name": "delete_coupons", "description": "Delete discount coupons." },
    { "name": "view_coupons", "description": "View discount coupons." },
    { "name": "manage_coupon_usage", "description": "Manage how coupons are used." },
    { "name": "activate_deactivate_coupons", "description": "Enable or disable coupons." },
    { "name": "create_categories", "description": "Create new categories." },
    { "name": "edit_categories", "description": "Edit existing categories." },
    { "name": "delete_categories", "description": "Delete categories." },
    { "name": "view_categories", "description": "View available categories." },
    { "name": "assign_categories_to_items", "description": "Assign categories to items." },
    { "name": "create_subcategories", "description": "Create new subcategories." },
    { "name": "edit_subcategories", "description": "Edit existing subcategories." },
    { "name": "delete_subcategories", "description": "Delete subcategories." },
    { "name": "view_subcategories", "description": "View available subcategories." },
    { "name": "assign_subcategories_to_items", "description": "Assign subcategories to items." },
    { "name": "create_orders", "description": "Create new orders." },
    { "name": "view_orders", "description": "View existing orders." },
    { "name": "update_order_status", "description": "Update the status of orders." },
    { "name": "delete_orders", "description": "Delete orders from the system." },
    { "name": "manage_order_payments", "description": "Manage payment processing for orders." },
    { "name": "view_order_reports", "description": "View analytics and reports related to orders." }
]


export const seedPermissions = async () => {
    try {
        // Remove existing permissions and roles
        await Permission.deleteMany({});
        await Role.deleteMany({});
        await User.findOneAndDelete({ email: ADMIN_EMAIL });
        // Insert permissions
        await Permission.insertMany(permissions);
        console.log('Permissions inserted.');
        return true
    } catch (error) {
        console.error('Error during seeding:', error);
        return false;
    }
};

