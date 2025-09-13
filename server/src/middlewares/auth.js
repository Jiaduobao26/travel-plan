import admin from "../config/firebase.js";

export async function authMiddleware(req, res, next) {
    try {
        const hdr = req.headers.authorization || "";
        const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
        if (!token) return res.status(401).json({ error: "Missing token" });


        if (!admin?.auth) throw new Error("Firebase not initialized");
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}