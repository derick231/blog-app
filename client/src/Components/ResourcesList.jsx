import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const fetchResources = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/resources`);
  return res.data;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ResourcesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const {
    isPending,
    error,
    data: resources = [],
  } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setPostsPerPage(mediaQuery.matches ? 5 : 3);
      setCurrentPage(1);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil(resources.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const visiblePosts = resources.slice(start, start + postsPerPage);

  return (
    <>
      {/* Staggered container */}
      <motion.div
        className="flex flex-col lg:flex-row gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visiblePosts.map((resource) => (
          <motion.div
            key={resource.id}
            variants={itemVariants}
            className="contents"
          >
            <Card resource={resource} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination (unchanged) */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="flex items-center">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ResourcesList;
