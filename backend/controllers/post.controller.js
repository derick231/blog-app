import { getAuth } from "@clerk/express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "username");

  res.status(200).json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img"
  );
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(403).json("User not found");
  }
  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });
  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }
  const newPost = new Post({
    user: user._id,
    slug,
    ...req.body,
  });

  const post = await newPost.save();
  res.status(201).json(post);
};

export const deletePost = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(404).json("User not found");
  }

  const role = getAuth(req).sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  }

  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json("You can delete only your posts");
  }

  res.status(200).json({ message: "Post deleted successfully" });
};

export const uploadAuth = (req, res) => {
  if (
    !process.env.IK_PUBLIC_KEY ||
    !process.env.IK_PRIVATE_KEY ||
    !process.env.IK_URL_ENDPOINT
  ) {
    return res.status(500).json({
      error: "ImageKit env vars missing",
    });
  }

  const imagekit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  res.json(imagekit.getAuthenticationParameters());
};
