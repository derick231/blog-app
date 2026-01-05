import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(401).json("User not found");
  }

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const { userId } = getAuth(req);
  const postId = req.body.postId;

  if (!userId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(401).json("User not found");
  }

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  setTimeout(() => {
    res.status(200).json(isSaved ? "post unsaved" : "post saved");
  },1000);
};
