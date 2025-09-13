import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load env early
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 4000),
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
    FIREBASE_SERVICE_ACCOUNT_JSON: process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
    UPLOAD_DIR: process.env.UPLOAD_DIR
        ? path.resolve(process.env.UPLOAD_DIR)
        : path.resolve(__dirname, "../../upload"),
};

// Minimal validation
if (!env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.warn("[env] FIREBASE_SERVICE_ACCOUNT_JSON is missing. Auth routes will fail.");
}


export default env;