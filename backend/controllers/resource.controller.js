import { getAuth } from "@clerk/express";
import Resource from "../models/resource.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

/* ================= GET ALL ================= */
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};

/* ================= GET ONE ================= */
export const getResource = async (req, res) => {
  try {
    const resource = await Resource.findOne({ slug: req.params.slug });

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resource" });
  }
};

/* ================= CREATE ================= */
export const createResource = async (req, res) => {
  try {
    const auth = getAuth(req);
    const clerkUserId = auth.userId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const role = auth.sessionClaims?.metadata?.role;

    if (role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const { title, desc, content, img, video } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    /* ---------- slug generation ---------- */
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let slug = baseSlug;
    let counter = 1;

    while (await Resource.findOne({ slug })) {
      slug = `${baseSlug}-${++counter}`;
    }

    const resource = await Resource.create({
      user: user._id,
      title,
      slug,
      desc,
      content,
      img,
      video,
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error("Create resource error:", error);
    res.status(500).json({ message: "Failed to create resource" });
  }
};

/* ================= IMAGEKIT AUTH ================= */
export const uploadAuth = (req, res) => {
  try {
    const { IK_PUBLIC_KEY, IK_PRIVATE_KEY, IK_URL_ENDPOINT } = process.env;

    if (!IK_PUBLIC_KEY || !IK_PRIVATE_KEY || !IK_URL_ENDPOINT) {
      return res.status(500).json({
        message: "ImageKit environment variables missing",
      });
    }

    const imagekit = new ImageKit({
      publicKey: IK_PUBLIC_KEY,
      privateKey: IK_PRIVATE_KEY,
      urlEndpoint: IK_URL_ENDPOINT,
    });

    res.status(200).json(imagekit.getAuthenticationParameters());
  } catch (error) {
    res.status(500).json({ message: "Failed to generate upload auth" });
  }
};
