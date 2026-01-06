import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostListItems from "./PostListItems";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const POSTS_PER_PAGE = 3;

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  return res.data;
};

const PostList = () => {
  const [page, setPage] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 🔥 Sort posts: newest first
  const sortedPosts = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;

  const currentPosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <>
      {/* POSTS */}
      <div className="flex flex-col gap-12">
        {currentPosts.map((post) => (
          <PostListItems key={post._id} post={post} />
        ))}
      </div>

      {/* PAGINATION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center gap-4 mt-6"
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border disabled:opacity-40"
        >
          Previous
        </button>

        <span className="flex items-center text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border disabled:opacity-40"
        >
          Next
        </button>
      </motion.div>
    </>
  );
};

export default PostList;
