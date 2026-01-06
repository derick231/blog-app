import { getAuth } from "@clerk/express"
import Resource from "../models/resource.model.js"
import User from "../models/user.model.js"
import ImageKit from "imagekit";


export const getResources = async(req,res)=>{
    const resources = await Resource.find()

    res.status(200).json(resources)
}

export const getResource = async(req, res)=>{
    const resource = await Resource.findOne({slug: req.params.slug})
    res.status(200).json(resource)
}

export const createResource = async (req, res) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(403).json("User not found");
  }

  const role = auth.sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json("Admins only");
  }

  // slug logic
  let slug = req.body.title.replace(/ /g, "-").toLowerCase();
  let existingResource = await Resource.findOne({ slug });
  let counter = 2;

  while (existingResource) {
    slug = `${slug}-${counter++}`;
    existingResource = await Resource.findOne({ slug });
  }

  const newResource = new Resource({
    user: user._id,
    slug,
    ...req.body,
  });

  const resource = await newResource.save();
  res.status(201).json(resource);
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