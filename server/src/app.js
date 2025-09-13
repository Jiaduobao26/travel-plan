import express from "express";
import env from "./config/env.js";
import "./config/firebase.js"; // side-effect: init if configured
import { corsMiddleware } from "./middlewares/cors.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.js";
import healthRouter from "./routes/health.js";
import attractionsMockRouter from "./routes/attractions.mock.js";

export function createApp() {
    const app = express();

    // Core
    app.disable("etag"); // dev: disable ETag caching
    app.use(corsMiddleware);
    app.use(express.json({ limit: "1mb" }));

    // Routes
    app.use("/", healthRouter);
    if (env.NODE_ENV === "development") {
        app.use("/api", attractionsMockRouter);
    }

    // 404 + error
    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}