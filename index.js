import app from "./app.js";
import connectDB from "./config/connectDB.js";

let dbConnectionPromise;

export default async function handler(req, res) {
    try {
        if (!dbConnectionPromise) {
            dbConnectionPromise = connectDB().catch((error) => {
                dbConnectionPromise = null;
                throw error;
            });
        }
        await dbConnectionPromise;
        return app(req, res);
    } catch (error) {
        console.error("API initialization failed:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}