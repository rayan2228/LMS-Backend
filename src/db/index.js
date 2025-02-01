import mongoose from "mongoose";
import Redis from "ioredis"
import { DBURL, REDISDBURL } from "../constant.js";

const connectDB = async () => {
    try {
        await mongoose.connect(DBURL, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout
        })
        console.log("DB Coonected");
        return true
    } catch (error) {
        console.log("DB", error);
        return false
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
