import React from "react";
import PageWrapper from "../Components/PageWrapper";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import ResourcesList from "../Components/ResourcesList";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const ResourcesPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <PageWrapper bg="resource">
        <Navbar />

        {/* Hero Section */}
        <div className="flex items-center justify-center h-[calc(100vh-100px)] lg:h-[calc(100vh-90px)]">
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-2xl md:text-4xl text-center uppercase tracking-widest">
              Resources
            </h1>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/writeresource"
                className="border px-6 py-2 uppercase tracking-wide"
              >
                Create Post
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </PageWrapper>

      {/* Content Section */}
      <div className="py-10 md:py-20 px-8 lg:px-16">
        <motion.h1
          variants={fadeUp}
          className="text-red-800 text-2xl md:text-4xl pb-10"
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        >
          Recently Added
        </motion.h1>

        <ResourcesList />
      </div>
    </motion.div>
  );
};

export default ResourcesPage;
