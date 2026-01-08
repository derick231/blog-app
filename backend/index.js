import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import resourceRouter from "./routes/resource.route.js";
import webhookRouter from "./routes/webhook.route.js";

dotenv.config();

const app = express();

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-x414.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight explicitly
app.options("*", cors());

/* ================= WEBHOOK (RAW BODY) ================= */
app.use("/webhooks", webhookRouter);

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= AUTH ================= */
app.use(clerkMiddleware());

/* ================= ROUTES ================= */
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/resources", resourceRouter);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
