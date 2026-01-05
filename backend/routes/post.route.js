import express from "express";
import {
  createPost,
  deletePost,
  uploadAuth,
  getPost,
  getPosts,
} from "../controllers/post.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", requireAuth(), createPost);
router.delete("/:id", requireAuth(), deletePost);

export default router;
