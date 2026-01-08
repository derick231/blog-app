import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Images from "../Components/Images";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SideMenu from "../Components/SideMenu";

const fetchResource = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/resources/${slug}`
  );
  return res.data;
};

const renderContent = (html) => {
  const sanitized = DOMPurify.sanitize(html);

  return sanitized.replace(
    /(https?:\/\/[^\s]+\.mp4)/g,
    `<video controls class="w-full rounded-lg my-4">
      <source src="$1" type="video/mp4" />
    </video>`
  );
};

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

const SingleResourcePage = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["resource", slug],
    queryFn: () => fetchResource(slug),
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
        className="px-8 lg:px-16"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* titles */}
        <div className="py-5 lg:py-10 ">
          <motion.h1
            variants={fadeUp}
            className="text-red-800 mb-5 text-2xl md:text-4xl"
          >
            {data.title}
          </motion.h1>
          <div className="flex gap-10 justify-between">
            <motion.p variants={fadeUp}>{data.desc}</motion.p>
            {data.img && (
              <motion.div
                variants={slideLeft}
                className="hidden lg:block lg:w-2/5"
              >
                <Images
                  src={data.img}
                  w="600"
                  h="400"
                  className="rounded-2xl"
                />
              </motion.div>
            )}
          </div>
        </div>
        {/* contents */}
        <div className="flex flex-col lg:flex-row  gap-5 lg:gap-10 py-5 lg:py-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden bg-transparent px-3 py-2 w-max shadow-lg rounded-full hover:bg-black hover:text-white"
          >
            {open ? "close" : "menu"}
          </motion.button>

          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:justify-between w-full">
            <motion.div
              variants={fadeUp}
              className="text-sm/6 break-words text-start quill-content"
              dangerouslySetInnerHTML={{
                __html: renderContent(data.content),
              }}
            />

            {/* menu */}
            <AnimatePresence>
              {(open || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className={`${open ? "block" : "hidden"} lg:block `}
                >
                  <SideMenu resource={data} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SingleResourcePage;
