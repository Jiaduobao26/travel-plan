import { Router } from "express";
import fs from "fs";
import path from "node:path";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();


router.post(
    "/attractions_mock",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const filePath = path.join(process.cwd(), "mock", "attractions.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const base = JSON.parse(raw);
        const withPlaceIds = fs.readFileSync(path.join(process.cwd(), "mock", "withPlaceIds.json"), "utf-8");
        res.json({ ...base, attractions: JSON.parse(withPlaceIds) });
    })
);

export default router;