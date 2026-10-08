import express from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";
import setRoute from "./routes/routes.js";
import { securityMiddlewares } from "./middlewares/security.js";
import { mongoInjectionBlock } from "./middlewares/mongoInjectionBlock.js";
import { xssSanitizer } from "./middlewares/xssSanitizer.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoInjectionBlock);
app.use(xssSanitizer);
app.use(securityMiddlewares);
setRoute(app);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === "production"  ? "Internal Server Error" : err.message,
    });
});

const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 3000;
        app.listen(port, "0.0.0.0", () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Server start failed:", error.message);
        process.exit(1);
    }
};
if (process.env.NODE_ENV !== "production") {
    startServer();
}

export default app;