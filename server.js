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


await connectDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(helmet());


app.use(cors({
  origin: "http://localhost:5173", // change to frontend URL in prod
  credentials: true
}));


app.use(morgan("dev"));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);


app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running 🚀"
  });
});


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});