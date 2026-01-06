import express from "express";
import {
  createResource,
  getResource,
  getResources,
  uploadAuth,
} from "../controllers/resource.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getResources);
router.get("/:slug", getResource);
router.post("/", requireAuth(), createResource);

export default router