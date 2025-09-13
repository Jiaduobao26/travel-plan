export function notFoundHandler(req, res, next) {
    res.status(404).json({ success: false, error: "Route not found" });
}

export function errorHandler(err, req, res, next) {
    console.error("[error]", err);
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        error: status === 500 ? "Internal server error" : err.message,
        details: req.app.get("env") === "development" ? String(err.stack || err) : undefined,
    });
}