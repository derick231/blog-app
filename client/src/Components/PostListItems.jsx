import React from "react";
import Images from "./Images";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PostListItems = ({ post }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex group flex-col-reverse  lg:flex-row gap-8 lg:gap-16 justify-center lg:items-center"
    >
      {/* image */}

      {post.img && (
        <div className="lg:w-2/5 overflow-hidden rounded-2xl shadow">
          <Images
            src={post.img}
            className=" object-cover group-hover:scale-110 duration-700 ease-in-out"
            w="700"
            h="500"
          />
        </div>
      )}

      {/* details */}
      <div className="flex flex-col gap-4 lg:w-3/5">
        <h1 className="">
          <Link
            to={post.slug}
            className="text-xl md:text-3xl hover:text-red-800 duration-500 ease-in-out"
          >
            {post.title}
          </Link>
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span>Written by</span>
          <Link className="text-blue-800">{post.user.username}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <div>
          <p className="text-sm text-start lg:text-md">{post.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PostListItems;
