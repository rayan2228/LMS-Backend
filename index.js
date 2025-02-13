import { app } from "./src/app.js";
import { PORT } from "./src/constant.js";
import { connectDB } from "./src/db/index.js";


app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}/test`);
    connectDB()
})