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
app.use("/api/v1", userRoute);


app.get("/test", (_, res) => {
    return res.send("Server is working");
});


app.use(errorHandler);

export { app };
