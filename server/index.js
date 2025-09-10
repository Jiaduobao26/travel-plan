const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

// 初始化 Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// ---- CORS ----
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false,
};
app.use(cors(corsOptions));  
app.use(express.json());

// 验证前端传来的 ID Token
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing token" });

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // 把用户信息挂到 req 上
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// TODO
app.set("etag", false); // 调试期禁用 ETag 缓存
app.get("/api/places/nearby", (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const type = String(req.query.type || "restaurant");

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return res.status(400).json({ error: "lat/lng required as numbers" });
  }

  // 造 5 个点，全部是 number，经纬度在传入坐标附近
  const mk = (name, dlat, dlng, id) => ({
    name,
    place_id: id,            // 可选字段，前端不用也不影响
    geometry: {
      location: {            // 这里是纯 number
        lat: Number((lat + dlat).toFixed(6)),
        lng: Number((lng + dlng).toFixed(6)),
      },
    },
    types: [type],
    rating: 4.5,             // 额外字段，前端不用也没关系
    user_ratings_total: 123, // 额外字段
    vicinity: "Nearby",      // 额外字段
  });

  const results = [
    mk("Demo Cafe",       +0.0010, +0.0012, "demo-1"),
    mk("Sample Restaurant",-0.0015, +0.0008, "demo-2"),
    mk("Test Sushi Bar",   +0.0022, -0.0010, "demo-3"),
    mk("Pasta House",      -0.0009, -0.0018, "demo-4"),
    mk("Burger Spot",      +0.0014, -0.0022, "demo-5"),
  ];

  res.status(200).json({
    status: "OK",   // 模拟 Google Places 的状态字段（可选）
    results,
  });
});


app.get("/api/secure-data", authMiddleware, (req, res) => {
  res.json({ message: "Hello " + req.user.email });
});
app.get("/health", (req, res) => res.send("ok"));

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
