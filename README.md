# Permissions Chart by Role

## **Roles**
- **Admin**: Full access to all permissions for high-level control.
- **Editor**: Content-focused role with permissions for managing categories, subcategories, and coupons but limited in financial and structural changes.
- **Instructor**: Limited permissions, primarily focused on viewing and interacting with relevant data.

---

## **Permissions Table**

| **Permission**                   | **Admin** | **Editor** | **Instructor** |
|-----------------------------------|-----------|------------|----------------|
| **LMS Management**               |           |            |                |
| `manage_users`                   | ✅        | ❌         | ❌             |
| `create_courses`                 | ✅        | ✅         | ✅             |
| `edit_courses`                   | ✅        | ✅         | ✅             |
| `delete_courses`                 | ✅        | ✅         | ❌             |
| `create_modules`                 | ✅        | ✅         | ✅             |
| `edit_modules`                   | ✅        | ✅         | ✅             |
| `delete_modules`                 | ✅        | ✅         | ❌             |
| `manage_content`                 | ✅        | ✅         | ✅             |
| `enroll_students`                | ✅        | ✅         | ❌             |
| `view_enrollments`               | ✅        | ✅         | ✅             |
| `manage_enrollments`             | ✅        | ✅         | ❌             |
| **Quiz Management**              |           |            |                |
| `create_quizzes`                 | ✅        | ✅         | ✅             |
| `edit_quizzes`                   | ✅        | ✅         | ✅             |
| `delete_quizzes`                 | ✅        | ✅         | ❌             |
| **Review Management**            |           |            |                |
| `view_reviews`                   | ✅        | ✅         | ✅             |
| `respond_to_reviews`             | ✅        | ✅         | ✅             |
| `moderate_reviews`               | ✅        | ✅         | ❌             |
| **Notification Management**      |           |            |                |
| `send_notifications`             | ✅        | ✅         | ✅             |
| `view_notifications`             | ✅        | ✅         | ✅             |
| `manage_notifications`           | ✅        | ✅         | ❌             |
| **System Settings**              |           |            |                |
| `view_settings`                  | ✅        | ❌         | ❌             |
| `manage_settings`                | ✅        | ❌         | ❌             |
| **Role Management**              |           |            |                |
| `view_roles`                     | ✅        | ❌         | ❌             |
| `manage_roles`                   | ✅        | ❌         | ❌             |
| **Report Management**            |           |            |                |
| `view_reports`                   | ✅        | ✅         | ❌             |
| `download_reports`               | ✅        | ✅         | ❌             |
| **Coupon Management**            |           |            |                |
| `create_coupons`                 | ✅        | ✅         | ❌             |
| `edit_coupons`                   | ✅        | ✅         | ❌             |
| `delete_coupons`                 | ✅        | ✅         | ❌             |
| `view_coupons`                   | ✅        | ✅         | ✅             |
| `manage_coupon_usage`            | ✅        | ❌         | ❌             |
| `activate_deactivate_coupons`    | ✅        | ✅         | ❌             |
| **Category Management**          |           |            |                |
| `create_categories`              | ✅        | ✅         | ❌             |
| `edit_categories`                | ✅        | ✅         | ❌             |
| `delete_categories`              | ✅        | ✅         | ❌             |
| `view_categories`                | ✅        | ✅         | ✅             |
| `assign_categories_to_items`     | ✅        | ✅         | ❌             |
| **Subcategory Management**       |           |            |                |
| `create_subcategories`           | ✅        | ✅         | ❌             |
| `edit_subcategories`             | ✅        | ✅         | ❌             |
| `delete_subcategories`           | ✅        | ✅         | ❌             |
| `view_subcategories`             | ✅        | ✅         | ✅             |
| `assign_subcategories_to_items`  | ✅        | ✅         | ❌             |
| **Order Management**             |           |            |                |
| `create_orders`                  | ✅        | ✅         | ❌             |
| `view_orders`                    | ✅        | ✅         | ✅             |
| `update_order_status`            | ✅        | ✅         | ❌             |
| `delete_orders`                  | ✅        | ❌         | ❌             |
| `manage_order_payments`          | ✅        | ❌         | ❌             |
| `view_order_reports`             | ✅        | ✅         | ❌             |

---

## **Description of Permissions**

### **LMS Management**
- **`manage_users`**: Full control over user accounts.
- **`create_courses`**, **`edit_courses`**, **`delete_courses`**: Manage course lifecycle.
- **`create_modules`**, **`edit_modules`**, **`delete_modules`**: Manage course modules.
- **`manage_content`**: Oversee all LMS-related content.
- **`enroll_students`**, **`view_enrollments`**, **`manage_enrollments`**: Handle student enrollments.

### **Quiz Management**
- **`create_quizzes`**, **`edit_quizzes`**, **`delete_quizzes`**: Create and manage quizzes.

### **Review Management**
- **`view_reviews`**, **`respond_to_reviews`**, **`moderate_reviews`**: Oversee and manage course reviews.

### **Notification Management**
- **`send_notifications`**, **`view_notifications`**, **`manage_notifications`**: Control notification systems.

### **System Settings**
- **`view_settings`**, **`manage_settings`**: Access and modify system configurations.

### **Role Management**
- **`view_roles`**, **`manage_roles`**: Manage user roles and permissions.

### **Report Management**
- **`view_reports`**, **`download_reports`**: Access analytics and data reports.

### **Coupon Management**
- **`create_coupons`**, **`edit_coupons`**, **`delete_coupons`**: Handle discounts and promotions.
- **`view_coupons`**, **`manage_coupon_usage`**, **`activate_deactivate_coupons`**: Monitor and update coupon usage.

### **Category Management**
- **`create_categories`**, **`edit_categories`**, **`delete_categories`**: Manage categories.
- **`view_categories`**, **`assign_categories_to_items`**: View and assign categories.

### **Subcategory Management**
- **`create_subcategories`**, **`edit_subcategories`**, **`delete_subcategories`**: Manage subcategories.
- **`view_subcategories`**, **`assign_subcategories_to_items`**: View and assign subcategories.

### **Order Management**
- **`create_orders`**, **`view_orders`**, **`update_order_status`**: Handle orders.
- **`delete_orders`**, **`manage_order_payments`**: Manage order cancellations and payments.
- **`view_order_reports`**: Access order-related analytics.
