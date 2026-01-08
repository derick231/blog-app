import React, { useState } from "react";
import Images from "../Components/Images";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../Components/PostMenuActions";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import axios from "axios";
import DOMPurify from "dompurify";
import Navbar from "../Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------ Animations ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ------------------ Helpers ------------------ */

const renderContent = (html) => {
  const sanitized = DOMPurify.sanitize(html);

  return sanitized.replace(
    /(https?:\/\/[^\s]+\.mp4)/g,
    `<video controls class="w-full rounded-lg my-4">
      <source src="$1" type="video/mp4" />
    </video>`
  );
};

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

/* ------------------ Component ------------------ */

const SinglePostPage = () => {
  const [open, setOpen] = useState(false);
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!";
  if (!data) return "Post not found!";

  return (
    <div>
      <div className="bg-[#0b1c2d]">
        <Navbar />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 lg:py-20 py-10 px-8 lg:px-16"
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="flex gap-8 ">
          <motion.div variants={stagger} className="flex flex-col gap-4 lg:w-3/5">
            <motion.h1 variants={fadeUp} className="text-2xl md:text-4xl text-red-800">
              {data.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="text-xs gap-2 flex items-center"
            >
              <span>Written by</span>
              <Link className="text-blue-800">{data.user.username}</Link>
              <span>{format(data.createdAt)}</span>
            </motion.div>

            <motion.p variants={fadeUp}>{data.desc}</motion.p>
          </motion.div>

          {data.img && (
            <motion.div
              variants={slideLeft}
              className="hidden lg:block lg:w-2/5"
            >
              <Images
                src={data.img}
                className="rounded-2xl"
                w="600"
                h="400"
              />
            </motion.div>
          )}
        </div>

        {/* ---------------- MOBILE MENU BUTTON ---------------- */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden bg-transparent hover:bg-black hover:text-white border rounded-full px-3 py-2 duration-300 shadow-lg w-36"
        >
          {open ? "Close" : "Menu"}
        </motion.button>

        {/* ---------------- CONTENT + SIDEBAR ---------------- */}
        <div className="flex flex-col-reverse lg:flex-row lg:gap-16 lg:justify-between">
          {/* Post Content */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 min-w-0 quill-content"
          >
            <div
              className="text-sm/6 break-words text-start quill-content"
              dangerouslySetInnerHTML={{
                __html: renderContent(data.content),
              }}
            />
          </motion.div>

          {/* Sidebar */}
          <AnimatePresence>
            {(open || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="lg:h-max lg:block lg:sticky top-8 text-xs flex mb-10 lg:mb-0 flex-col gap-2 text-center"
              >
                <h2 className="text-start">Author</h2>

                <div className="flex items-center gap-4 mt-2">
                  {data.user.img && (
                    <Images
                      src={data.user.img}
                      className="w-10 h-10 rounded-full object-cover"
                      w="48"
                      h="48"
                    />
                  )}
                  <Link className="text-blue-800">
                    {data.user.username}
                  </Link>
                </div>

                <PostMenuActions post={data} />
           
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SinglePostPage;
