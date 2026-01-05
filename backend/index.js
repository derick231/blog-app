import express from "express";
import connectDB from "./lib/connectDB.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware,  } from "@clerk/express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(clerkMiddleware());

/* ================= WEBHOOK (RAW BODY ONLY) ================= */
app.use("/webhooks", webhookRouter);

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

/* ================= ERROR HANDLER ================= */
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

/* ================= SERVER ================= */
app.listen(3000, () => {
  connectDB();
  console.log("Server is running!");
});
