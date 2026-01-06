import React from "react";
import { Link } from "react-router-dom";
import PostList from "../Components/PostList";
import Navbar from "../Components/Navbar";
import PageWrapper from "../Components/PageWrapper";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Stories = () => {
  return (
    <>
      <PageWrapper bg="stories">
        {/* TOP SECTION */}
        <Navbar />

        {/* CENTER SECTION */}
        <div className="flex items-center h-[calc(100vh-100px)] lg:h-[calc(100vh-90px)]">
          <div className="flex items-center justify-between w-full px-8 lg:px-16">
            {/* titles */}
            <motion.div
              className="max-w-2xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-2xl md:text-4xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                iusto laudantium necessitatibus
              </h1>

              <p className="mt-4 md:mt-8 text-md md:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita porro eum vitae.
              </p>
            </motion.div>

            {/* animated button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative md:block hidden"
            >
              <Link to="/write">
                <svg
                  viewBox="0 0 200 200"
                  width="200"
                  height="200"
                  className="animate-spin animatedButton"
                >
                  <path
                    id="circlePath"
                    fill="none"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1-150,0"
                  />
                  <text>
                    <textPath
                      href="#circlePath"
                      startOffset="0%"
                      stroke="white"
                    >
                      Create Blog...
                    </textPath>
                    <textPath
                      href="#circlePath"
                      startOffset="50%"
                      stroke="white"
                    >
                      Share your idea ...
                    </textPath>
                  </text>
                </svg>

                <button className="bg-blue-800 flex items-center justify-center rounded-full h-20 w-20 absolute inset-0 m-auto">
                  ✍️
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </PageWrapper>

      <h1 className="text-2xl md:text-4xl px-8 lg:px-16 pt-8 lg:pt-16 text-red-800 uppercase">Recent Stories</h1>

      {/* POSTS SECTION */}
      <div className="py-6 lg:py-12 flex flex-col gap-4 px-8 lg:px-16">
        <PostList />
      </div>
    </>
  );
};

export default Stories;
