import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import webhookRouter from "./routes/webhook.route.js";

dotenv.config();

const app = express();

/* ======================= CORS ======================= */
const allowedOrigins = [
  process.env.CLIENT_URL,        // Vercel frontend
  "http://localhost:5173",        // Local frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ======================= WEBHOOK ======================= */
/* Webhooks need raw body → keep this BEFORE express.json */
app.use("/webhooks", webhookRouter);

/* ======================= PARSERS ======================= */
app.use(express.json());

/* ======================= AUTH ======================= */
app.use(clerkMiddleware());

/* ======================= ROUTES ======================= */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

/* ======================= ERROR HANDLER ======================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

/* ======================= SERVER ======================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  }
});
