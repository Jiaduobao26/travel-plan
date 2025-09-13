import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => res.send("ok"));
router.get("/secure-data", (req, res) => {
    // This route is better in its own file if it will grow.
    // Keep /secure-data under /api if you want—shown here for parity.
    res.status(501).json({ error: "Move this under /api with auth if needed" });
});

export default router;