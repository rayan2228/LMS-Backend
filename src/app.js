import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.middleware.js";
import { origin } from "./constant.js";
const app = express();

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cors({ origin }));
app.use(cookieParser());
app.use(express.static("public"));

import userRoute from "./route/user.route.js";
import courseRoute from "./route/course.route.js";
import categoryRoute from "./route/category.route.js";
import subcategoryRoute from "./route/subcategory.route.js";
import permissionRoute from "./route/permission.route.js";
import roleRoute from "./route/role.route.js";
import moduleRoute from "./route/module.route.js";
import topicRoute from "./route/topic.route.js";
import lessonRoute from "./route/lesson.route.js";
app.use("/api/v1", userRoute);
app.use("/api/v1", courseRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", subcategoryRoute);
app.use("/api/v1", roleRoute);
app.use("/api/v1", courseRoute);
app.use("/api/v1", moduleRoute);
app.use("/api/v1", topicRoute);
app.use("/api/v1", lessonRoute);
if (process.env.NODE_ENV === "development") {
    app.use("/api/v1", permissionRoute);
}


app.get("/test", (_, res) => {
    return res.send("Server is working");
});


app.use(errorHandler);

export { app };
