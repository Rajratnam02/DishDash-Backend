import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDb from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();


// ✅ FIX 1: TRUST PROXY (VERY IMPORTANT for Vercel/Render)
app.set("trust proxy", 1);


// ✅ DB CONNECTION
await connectDb();


// ✅ BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ SECURITY
app.use(helmet());


// ✅ CORS (allow frontend)
app.use(cors({
  origin: [
    "https://dish-dash-recipe.vercel.app",
    "http://localhost:5173" // for local dev
  ],
  credentials: true
}));


// ✅ LOGGER
app.use(morgan("dev"));


// ✅ FIX 2: RATE LIMITER (safe config)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);


// ✅ ROUTES
app.use("/api", apiRoutes);


// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running 🚀"
  });
});


// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});