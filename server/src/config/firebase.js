import admin from "firebase-admin";
import env from "./env.js";

// Guard init in case of hot-reload
if (!admin.apps.length && env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;