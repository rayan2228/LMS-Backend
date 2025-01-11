import mongoose from "mongoose";
import Redis from "ioredis"
import { DBURL, REDISDBURL } from "../constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect(DBURL)
        console.log("DB Coonected");
    } catch (error) {
        console.log("DB", error);
    }
}


const connectRadis = async () => {
    try {
        const client = new Redis(REDISDBURL);
        console.log("redis connected");
        return client
    } catch (error) {
        console.log("REDISDB", error);
    }

}

const redis = await connectRadis()

export { connectDB, redis }
