import mongoose from "mongoose";
import { DBURL } from "../constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect(DBURL)
        console.log("DB Coonected");
    } catch (error) {
        console.log("DB", error);
    }
}

export { connectDB }
