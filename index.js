import { app } from "./src/app.js";
import { PORT } from "./src/constant.js";
import { connectDB } from "./src/db/index.js";
import { seedPermissions } from "./src/seeders/permissionSeeder.js";
import { seedRoles } from "./src/seeders/roleSeeder.js";

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}/test`);
    connectDB()
    // const permissions = seedPermissions()
    // if (permissions) {
    //     seedRoles()
    // }
})