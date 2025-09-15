import admin from "../config/firebase.js";
import prisma from "../config/db.js";

export async function authMiddleware(req, res, next) {
    try {
        const hdr = req.headers.authorization || "";
        const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
        if (!token) return res.status(401).json({ error: "Missing token" });

        if (!admin?.auth) throw new Error("Firebase not initialized");

        const decoded = await admin.auth().verifyIdToken(token);

        // 落库：如果用户不存在就创建，存在就更新 lastLoginAt
        await prisma.user.upsert({
            where: { uid: decoded.uid },
            update: { lastLoginAt: new Date() },
            create: {
                uid: decoded.uid,
                email: decoded.email || null,
                emailVerified: !!decoded.email_verified,
                name: decoded.name || null,
                avatar: decoded.picture || null,
                provider: decoded.firebase?.sign_in_provider || null,
                lastLoginAt: new Date(),
            },
        });

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}